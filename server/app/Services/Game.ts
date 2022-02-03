import Database from "@ioc:Adonis/Lucid/Database";
import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import Level from "App/Models/Level";
import Player from "App/Models/Player";
import State from "App/Models/State";
import StatsDevotion from "App/Models/StatsDevotion";
import User from "App/Models/User";
import Wallet from "App/Models/Wallet";
import XpThreshold from "App/Models/XpThreshold";
import { Socket } from "socket.io";
import Ws from "./Ws";

class Game {


    public players;


    constructor() {
    }

    public async initplayer(id, socket: Socket) {
        // const user = await User.findOrFail(id);
        // const level = await Level.findOrFail(id);
        // const wallet = await Wallet.findOrFail(id);
        // const stats = await StatsDevotion.findOrFail(id);
        // console.log("testing");
        // const xpthresholds = await XpThreshold.findOrFail(id)
        // const states = await State.findOrFail(id)
        // const playerdata = await Player.findOrFail(id);
        this.players[id]['socket'] = socket;
        this.players[id]['wallet'] = await Database.query().from('wallets').select('*').where('id', id)[0];
        this.players[id]['levels'] = await Database.query().from('levels').select('*').where('id', id)[0];
        this.players[id]['states'] = await Database.query().from('states').select('*').where('id', id)[0];
        this.players[id]['stats'] = await Database.query().from('stats_devotions').select('*').where('id', id)[0];
        this.players[id]['playerdata'] = await Database.query().from('this.players').select('*').where('id', id)[0];
        this.players[id]['userinfo'] = await Database.query().from('users').select('*').where('id', id)[0];

    }

    public async deletePlayer(id) {
        delete this.players[id];
    }

    public gatherAction(id: string | number, type: string) {
        if (type === 'none') {
            throw new SyntaxError();
        }
        let result = {};

        let typenaming = ["level_" + type, "xp_" + type,''];

        //@ts-ignore
        typenaming[2] = () => {           
             const t = type;
            if (t === 'mining') {
                return 'copper';
            } else if (t === 'woodcutting') {
                return 'wood';
            } else if (t === 'hunting') {
                return 'food';
            } else if (t === 'quarrying') {
                return 'stone';
            }
            return '';}

        // Resource Allocation
        //@ts-ignore
        let min = (0.5 * this.players[id][typenaming[0]]);
        //@ts-ignore
        let max = (1.5 * this.players[id][typenaming[0]]);

        // calculate "true" number of resources rolled
        let resources = min + (Math.random() * (max - min));
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

        //@ts-ignore
        result[typenaming[2]()] = resources;

        //@ts-ignore
        result[typenaming[1]] = this.calcpxp(id);
        //@ts-ignore
        // add the xp to the player's store
        this.players[id]['levels'][typenaming[1]] += result[typenaming[1]];

        // calculate profession xp and levelups
        
        let level = this.players[id]['levels'][typenaming[0]]
        //@ts-ignore
        let currxp = this.players[id]['levels'][typenaming[1]];

        let xpThreshold = Math.floor(1000 + (4000*level) + (10*Math.pow(level, 2)) + Math.pow(1.1, level/25));
    
        if (currxp > xpThreshold) {
            this.players[id]['levels'][typenaming[0]]++;
            this.players[id]['levels'][typenaming[1]] -= xpThreshold;
        }

        return result;
    }

    /**
     * calculate profession xp
     * @param boosts 
     * @return xp 
     */
    public calcpxp(id) {
        let base = 10;
        let total = base;
        return total;
    }
    /**
     * saves core (updated each action) information
     * @param wallet_levels_stats - objects with the data to store
     */
    public async saveCore(levels = null, wallet = null, stats = null, id) {
        let leveli, walleti, statsi;

        if (levels) {
            leveli = await Level.findOrFail(id);
            leveli.merge(levels).save();
        }
        if (wallet) {
            walleti = await Wallet.findOrFail(id);
            walleti.merge(wallet).save();
        }
        if (stats) {
            statsi = await StatsDevotion.findOrFail(id);
            statsi.merge(stats).save();
        }
    }

}

export default new Game();