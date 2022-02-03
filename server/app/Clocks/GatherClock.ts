import Ws from "../Services/Ws";
import cron from 'node-cron'
import GatherCalc from 'App/Calculators/GatherCalc'
import  {UserStore}  from "../Services/UserStore"
import Database from "@ioc:Adonis/Lucid/Database";

export class GatherClock {
    private nextClockTick;
    private clock;
    private actionclass: string; // combat, gather, forge, jewelcraft
    private type; // the resource being gathered, if gathering.
    private response;
    private store: UserStore;
    private id;
    private delta; // used to adjust setInterval so it's more accurate

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
        this.start();
    }
    /**
     * Starts the game clock.
     * Uses timestamps for checking ticks against the server.
     * @param logic = primary logic function used to render server-side actions.
     * The type depends on the action - 'jewelcraft', 'forge', 'gather', or 'combat'
     */
    public async start() {
       if (this.store.getClockStatus()) {
           console.log('clock running');
            this.clock.destroy();
       }
       this.store.setClockStatus(true);
       this.clock = cron.schedule('*/6 * * * * *', () => {
            // console.log("THE CLOCK")
            Ws.io.emit('prepareClockStart'); // allows client to display preparation text
           // await this.clock.cancel();// makes sure multiple clocks can't run at the same tim
                let tickstart = Date.now();
                this.nextClockTick = tickstart + 6000;
                Ws.io.emit('clock-tick', {
                    nextTick: this.nextClockTick
                })     
                GatherCalc.init(this.id, this.type, this.store);
                const response = GatherCalc.action();
    
        
                this.store.update(response);
        
                Ws.io.emit('gather-result', response);
                console.log('tick at ' + Date.now())
                 Ws.io.emit('tick', {
                    id: this.id,
                }) // emits next tick time
                
        })
       }
    

    public async clockloop() {

    }
    /**
     * Stops the tick clock.
     */
    public stop() {
        if (this.store.getClockStatus()) {
            console.log("destroy it");
            this.clock.destroy();
            this.store.setClockStatus(false);
        }
    }

    public getClockStatus() {
        return this.store.getClockStatus();
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