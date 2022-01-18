import Database from "@ioc:Adonis/Lucid/Database";
import { UserStore } from "App/Services/UserStore";
import Ws from "App/Services/Ws";
import XpThreshold from "App/Models/XpThreshold";
import User from "App/Models/User";
import Level from "App/Models/Level";

/**
 * This class handles all xp calculations for ALL skills.
 * Since all xp is handled about the same way (except for jewelcrafting) it's easy to
 * put everything in the same file without encapsulating each action.
 */
class XPCalc {
    public masterylevel;
    public store;


    constructor () {
        // this.masterylevel = Database.query()
        // .from('levels').select('level_mastery').where('')
    }


    public calcpxp = (boosts={}) => {
        let base = 10;
        let total = base;
        return total;
    }

    public async levelup(id, actionclass, variable, store) {
            console.log('var: ' + variable)
            store.levels['xp_' + variable] = 0;
            store.levels['level_' + variable]++;
            console.log(store.levels['level_' + variable] + " level!")
            let dblevel = await Level.findOrFail(id);
            dblevel.merge({['level_' + variable]: store.levels['level_' + variable]}).save();
            Ws.io.emit('levelup', {
                variable: variable
            })
            // calculate new xp threshold and store it, then push to db immediately (saves some steps)
            // not time-hungry since this rarely happens on each action
            let n = store.levels['level_' + variable]
            // max xp formula: 1,000 + 4,000n + 10n^2 * (1.1^(n/25))
            let newthreshold = Math.floor(1000 + (4000*n) + (10*Math.pow(n, 2)) + Math.pow(1.1, n/25));
            store.xpthresholds[variable] = newthreshold;
            let db = await XpThreshold.findOrFail(id);
            db.merge({[variable]: newthreshold}).save();
        }
    

    /**
     * 
     * @param actionclass combat, gather, forge, jewelcraft
     * @param variable NOT the type. Instead, the db variable name. 
     * For mining xp, for example, it would be 'mining'. 
     * For non-gathering skills, it equals the action class.
     * @param store userstore
     */
    public action(id, actionclass, variable='none', store: UserStore) {
        let response = {};
        let dbname = 'xp_' + variable
        if (actionclass='gather') {
            let thispxp = this.calcpxp();
            console.log(thispxp + " experience")
            response[dbname] = thispxp;
            store.levels[dbname] += thispxp;

            let currentxp = store.levels[dbname];
            // if leveling up
            if (currentxp >= store.xpthresholds[variable]) {
                response['level_' + variable] = 1;
                this.levelup(id, actionclass, variable, store);
            }
            // calcmasteryxp()
            return response;
        }
    }

}

export default new XPCalc();








// export default new XpCalc();