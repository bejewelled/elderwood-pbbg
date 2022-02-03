import Ws from "./Ws";


class ServerInfo {
    public connectedPlayers: number[]
    public activePlayers: number[]


    constructor() {
        Ws.io.on('connection', (socket) => {
        })
    }

    public addPlayer (id) {
        this.activePlayers.push(id);

    }

    public removePlayer(id) {
        const index = this.activePlayers.indexOf(id);
        this.activePlayers.splice(index, 1);
    }

}

export default new ServerInfo();