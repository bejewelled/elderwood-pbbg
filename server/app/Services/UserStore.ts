import Database from "@ioc:Adonis/Lucid/Database";
import Level from "App/Models/Level";
import State from "App/Models/State";
import Wallet from "App/Models/Wallet";
import { parse } from "dotenv";
import Ws from "./Ws";

 /**
  * This store should only contain values that are expected to change every action
  * e.g. Wallet and Level tables.
  */
export class UserStore {
     // used only to push values into the db
    public clock;
    // holds a tempstore of everything that would be action-updated.
    public wallet;
    public levels: Object;
    public xpthresholds: Object;
    private id;
    public states;

    /**
     * Initializes the values of the user
     * @param id id to check db against
     */
    constructor (id) { 
        this.id = id;
        this.assign(id);

    }

    public async assign(id) {
        console.log(id);
        this.wallet = await Database.query().from('wallets').select('*').where('id', id)[0];
        this.levels = await Database.query().from('levels').select('*').where('id', id)[0];
        this.xpthresholds = await Database.query().from('xp_thresholds').select('*').where('id', id)[0];
    }
    public async getID() {
        return this.id;
    }

    public getClockStatus() {
        return this.states['isActive'];
    }

    public async setClockStatus(bool: boolean) {
        this.states['isActive'] = bool;
        console.log(this.id);
        const active = await State.findOrFail(this.id);
        active.merge({is_active: bool}).save();
    }


    /**
     * Updates the shared store.
     * @param response A JSON object of the items to update in userstore
     */
    public async update(response) {
        let walletdbupdate = {};
        let levelsdbupdate = {};
        for (const key of Object.keys(response)) {
           if (this.wallet.hasOwnProperty(key)) {
                this.wallet[key] = parseInt(this.wallet[key]) + parseInt(response[key]);
                walletdbupdate[key] = parseInt(this.wallet[key]);
            } else if (this.levels.hasOwnProperty(key)) {
                // this.levels[key] = parseInt(this.levels[key]) + parseInt(response[key]);
                levelsdbupdate[key] = this.levels[key];
            }
        }
        this.push(walletdbupdate, levelsdbupdate);

    }

    // pushes all values onto database
    public async push(twallet, tlevels) {
        // console.log('-----')
        // console.log(tlevels);
        //TODO fix this
        const dbwallet = await Wallet.findOrFail(this.id);
        const dblevels = await Level.findOrFail(this.id);
        dbwallet.merge(twallet).save();
        dblevels.merge(tlevels).save();

        // sends info to client
        const userdata = {
            wallet: this.wallet,
            levels: this.levels,
            xpthresholds: this.xpthresholds
        }

        Ws.io.emit('pushuserdata', userdata);
    }

}


