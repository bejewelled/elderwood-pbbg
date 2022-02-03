import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ws from "App/Services/Ws";

export default class DataController {

    constructor() {
        Ws.io.on('connection', (socket) => {
            socket.on('user-join', (id) => {
                socket.join("room"+id);
            })
        })
    }


}
