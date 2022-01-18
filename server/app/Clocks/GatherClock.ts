import Ws from "../Services/Ws";
import schedule from 'node-schedule';
import GatherCalc from 'App/Calculators/GatherCalc'
import  {UserStore}  from "../Services/UserStore"

class GatherClock {
    private nextClockTick;
    private clock: schedule.Job;
    private actionclass: string; // combat, gather, forge, jewelcraft
    private type; // the resource being gathered, if gathering.
    private response;
    private store;
    private id;
    private clockRunning = false;

    /**
     * 
     * @param logic the function used as a calculator, each action.
     * @param actionclass the type of action
     * @param type the resource being gathered if gathering, 'none' if not gathering.
     */
    public async init(id: { id: any; }, type: { type: any; }, userstore: UserStore) {
        //console.log('intial');
        this.id = id;
        this.type = type;
        this.store = userstore;
    }
    /**
     * Starts the game clock.
     * Uses timestamps for checking ticks against the server.
     * @param logic = primary logic function used to render server-side actions.
     * The type depends on the action - 'jewelcraft', 'forge', 'gather', or 'combat'
     */
    public async start() {
        
        this.stop(); // makes sure multiple clocks can't run at the same time
        this.clockRunning = true;
        // console.log("THE CLOCK")
        Ws.io.emit('prepareClockStart'); // allows client to display preparation text

        this.clock = schedule.scheduleJob('*/6 * * * * *',() => {
            let tickstart = Date.now();
            this.nextClockTick = this.clock.nextInvocation().getTime(); // grabs next tick (for client-side display)
            console.log(this.nextClockTick);
            Ws.io.emit('clock-tick', {
                nextTick: this.nextClockTick
            })
            console.log("clock tick");   // for testing        

            GatherCalc.init(this.id, this.type, this.store);
            const response = GatherCalc.action();

            console.log(response);

            this.store.update(response);

            Ws.io.emit('gather-result', response);

             Ws.io.emit('tick', {
                id: this.id,
            }) // emits next tick time

            console.log("Latency: " + (Date.now() - tickstart) + " ms")
        })
    }

    /**
     * Stops the tick clock.
     */
    public stop() {
        if (this.clockRunning) {
            this.clock.cancel();
        }
    }

    /**
     * Returns the result of the most recent tick. This MUST occur before any client-side activity occurs.
     * @return the result of last tick, in JSON object format with standard naming conventions.
     */
    public getResponse() {
        return this.response;
    }

    /**
     * Gets the timestamp of the next clock tick.
     */
    public getNextTick() {
        return this.nextClockTick || null;
    }

}

export default new GatherClock();