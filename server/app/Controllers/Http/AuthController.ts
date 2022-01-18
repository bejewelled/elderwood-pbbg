import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Level from 'App/Models/Level'
import Wallet from 'App/Models/Wallet'
import SilentAuthMiddleware from 'App/Middleware/SilentAuth'
import StatDevotion from 'App/Models/StatDevotion'
import Ws from 'App/Services/Ws'
import Database from '@ioc:Adonis/Lucid/Database'
import  {UserStore}  from 'App/Services/UserStore'
import XpThreshold from 'App/Models/XpThreshold'

export default class AuthController {
    public async registerShow({}: HttpContextContract) {
        // return DataView.render
    }

    public async register({ request, response, auth }: HttpContextContract) {
        console.log("this is being called");
        try {
            const userSchema = schema.create({
                username: schema.string({trim: true}, [rules.unique({ table: 'users', column: 'username', caseInsensitive: true,})]),
                email: schema.string({trim: true}, [rules.email(), rules.unique({ table: 'users', column: 'username', caseInsensitive: true,})]),
                password: schema.string({}, [rules.minLength(8)])
            });
                const data = await request.validate({schema: userSchema});

                const user = await User.create(data);
                const level = await Level.create({level_combat: 0})
                const wallet = await Wallet.create({gold: 0})
                const stats = await StatDevotion.create({combat_attack: 0})
                const xpthresholds = await XpThreshold.create({mining: 0})
        
                // logs in user after registration
                await auth.login(user);
                return response.status(200);
        } catch (e) {
            // returns if unique validation error occurs
            if (e.name === 'ValidationException') {
                return response.status(406);// indicate to the client that the user is not registered
            }
        }
    


    }

    public async login({request, response, auth}: HttpContextContract) {
        const {username, password} = request.only(['username', 'password']);
        try {
            // console.log('CHECKING WITH ' + username + " " + password);
            await auth.attempt(username, password);
            // console.log('authenticated!');

            // Ws.io.emit('update-id', {
            //     id: await Database.query().from('users').select('id').where('username', username),
            //     username: username
            // })

            
            return {
                id: await Database.query().from('users').select('id').where('username', username),
                username: username
            }
        } catch (e) {
            console.log(e);

            Ws.io.emit('unauthorized');
            // return response.status(401); // indicate to the client that the user is not authenticated
            // console.log(e);
            // console.log("RETURN THIS");
            // // console.log("username or password is incorrect");
            // // session.flash('form', 'Your username or password is incorrect');
            // return e;
            return response.status(401);
        }

        return "incorrectDetailsError"

    }
}



