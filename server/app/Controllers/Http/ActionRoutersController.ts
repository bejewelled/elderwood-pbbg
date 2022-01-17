import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import GatherClock from 'App/Clocks/GatherClock';
import  { UserStore } from 'App/Services/UserStore';
import Ws from 'App/Services/Ws';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ActionRoutersController {


    /**
     * Request will contain:
     * @request contains id, actionclass, type
     * 
     */
    public async routeAction({request, response}:HttpContextContract) {
        //console.log("yes");
        let actionclass= request.only(['actionclass']).actionclass;
        let type = request.only(['type']).type;
        let id = request.only(['id']).id;
        console.log(actionclass + " " + type + " " + id)
        
        const store = new UserStore(id);
        store.wallet = await Database.query().from('wallets').select('*').where('id', id);
        store.levels = await Database.query().from('levels').select('*').where('id', id);
        store.wallet = store.wallet[0];
        store.levels = store.levels[0];
        //console.log(store.wallet);

        //@ts-ignore
        if (actionclass === 'combat') {
        //@ts-ignore
        } else if (actionclass ==='gather') {
            /*
            CombatClock.stop()
            ForgingClock.stop()
            JewelcraftingClock.stop()
            */
            //console.log("THE TYPE IS: " + type);
           await GatherClock.init(id, type, store);
           await GatherClock.start();
        }
    }

}
