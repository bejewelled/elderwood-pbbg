import Database from "@ioc:Adonis/Lucid/Database";
import Level from "App/Models/Level";
import Wallet from "App/Models/Wallet";

 /**
  * This store should only contain values that are expected to change every action
  * e.g. Wallet and Level tables.
  */
export class UserStore {
     // used only to push values into the db
    private dbwallet;
    private dblevels;
    // holds a tempstore of everything that would be action-updated.
    public wallet;
    public levels: Object;
    private id;

    /**
     * Initializes the values of the user
     * @param id id to check db against
     */
    constructor (id) { 
        this.id = id;
        this.assign(id);

    }

    public async assign(id) {
        this.wallet = await Database.query().from('wallets').select('*').where('id', id)[0];
        this.levels = await Database.query().from('levels').select('*').where('id', id)[0];
    }
    public async getID() {
        return this.id;
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
                this.wallet[key] = BigInt(this.wallet[key]) + BigInt(response[key]);
                walletdbupdate[key] = BigInt(this.wallet[key]);
            } else if (this.levels.hasOwnProperty(key)) {
                this.levels[key] += BigInt(this.levels[key]) + BigInt(response[key]);
                levelsdbupdate[key] = BigInt(this.levels[key]);
            }
        }
        this.push(walletdbupdate, levelsdbupdate);

    }

    // pushes all values onto database
    public async push(wallet, levels) {
        console.log(wallet);
        //TODO fix this
        const dbwallet = await Wallet.findOrFail(this.id);
        const dblevels = await Level.findOrFail(this.id);
        console.log(dbwallet);
        await dbwallet.merge(wallet);
        await dblevels.merge(levels);
    }

}


