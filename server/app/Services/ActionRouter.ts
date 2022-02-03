import { Server } from "@adonisjs/core/build/standalone";
import Game from "./Game";
import ServerInfo from "./ServerInfo";
import Ws from "./Ws";


export default class ActionRouter {

    public players;

    constructor() {
        Ws.io.on('connection', (socket) => {

            console.log("yes");
            socket.on('init-id', (data) => {
                ServerInfo.connectedPlayers.push(data.id);
                Game.initplayer(data.id, socket);
            })

            socket.on('action-start', (data) => {
                ServerInfo.addPlayer(data.id);
                this.players['id'] = data.id;
                switch (data.actionclass) {
                    case 'combat':
                        break;
                    case 'gather':
                        socket.emit('action-prepare');
                        setTimeout(() => {}, 1500); // prevents "instant actions" from constant page reloading
                        //setInterval is accurate enough, for now. If this becomes a problem it can be changed
                        this.players[data.id]['action-timer'] = setInterval(() => {
                            let next = Date.now() + 6000;

                            let result = Game.gatherAction(data.id, data.type);
                            let eventid = 'action-' + data.id + '-gather';
                            socket.emit(eventid, result); // send the action's result to client for displaying
                        },6000)
                    case 'jewelcraft':
                        break;
                    case 'forge':
                        break;       
                 }
             })

             socket.on('action-stop', (data) => {
                ServerInfo.removePlayer(data.id);
                clearInterval(this.players[data.id]['action-timer']);
             })

         })
     }


}
