import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import {GatherClock} from 'App/Clocks/GatherClock';
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

        }
    }

}
