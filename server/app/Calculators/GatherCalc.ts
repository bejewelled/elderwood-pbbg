import Database from '@ioc:Adonis/Lucid/Database'
import Level from 'App/Models/Level';
import User from 'App/Models/User';
import { UserStore } from 'App/Services/UserStore';
import Ws from 'App/Services/Ws';


class GatherCalc {
    public type: string; // string
    private id;
    private store: UserStore;
    private level;
    private boosts; // TODO
    private typenaming: [string, string, () => string];

    private range = (level, bonus) => { // range of resources possible per action, r[0] = min, r[1] = max
        let r = [0, 0];
        r[0] = (level * 0.5) + bonus;
        r[1] = (level * 1.5) + bonus;
        return r;
    }

    /**
     * Calculates boosts based on a bunch of stuff
     * @return array
     * arr[0] = base bonus
     * arr[1] = equipment bonus percentage
     * arr[2] = other bonus percenage
     */
    private calculateBoosts = () => {
        //TODO
    }

    public async init(id, type, store) {
        this.id = id;
        this.type = type;
        this.store = store;

        // follows standard naming convention
        this.typenaming = ["level_" + this.type, "xp_" + this.type, () => {
            const t = this.type;
            if (t === 'mining') {
                return 'copper';
            } else if (t === 'woodcutting') {
                return 'wood';
            } else if (t === 'hunting') {
                return 'food';
            } else if (t === 'quarrying') {
                return 'stone';
            }
            return '';
        }]; // used for response object
        
        this.level = store.levels[this.typenaming[0]];

    }

    /**
     * A gather action (purely calculations).
     * Calculates resources gained on action.
     * Calls luck rolling function.
     * Returns a JSON object with the amount of items gained on this action.
     * 
     * @return a JSON object with the following:
     * - resources
     * - xp
     * - drops {
     * -- gem
     * -- cobalt_fragment
     * -- radiant_soul
     * -- prismatic_shard 
     *   }
     * - other {
     * -- [other variables, they must use standard naming convention (in spreadsheet)]}
     * 
     * @warning This may have to be async if there are significant lag issues
     */
    public action() {
        let resources = 0;
        let drops = {
            gem: 0,
            cobalt_fragment: 0,
            radiant_soul: 0,
            prismatic_shard: 0
        }

        // let baseAdditional; TODO when +base res is implemented, implement arg2
        let resrange = this.range(this.level, 0);
        let min = resrange[0];
        let max = resrange[1];
       // console.log(min + " " + max);
        
        // calculate "true" number of resources rolled
        resources = min + (Math.random() * (max - min));
        //console.log(resources + " step 1");
        
        // grab the decimal portion of the resource roll
        let remainder = resources - Math.floor(resources);

        //console.log(resources + " step 2");

        if (Math.random() <= remainder) {
            resources++;
        } 

       // console.log(resources + " step 3");
        // "integerize" the number of resources gained
        resources = Math.floor(resources);

        let response = {};
        response[this.typenaming[2]()] = resources;
        //console.log(response);

        return response;
        // return in JSON format

    }
}

export default new GatherCalc();