import { writable } from "svelte/store";
import {id} from "$lib/stores/user"

export const actions = writable({});
export const userdata = writable({
    wallet: {
        cobalt_fragment: "0",
        copper: 1,
        created_at: "2022-01-18T06:33:15.028Z",
        dark_matter: "0",
        essence: "0",
        food: "0",
        gems: "0",
        gold: "0",
        id: id,
        prism_shard: "0",
        stamina: "200",
        stone: "0",
        tome_knowledge: "0",
        updated_at: "2022-01-18T06:33:15.028Z",
        wood: "0",
    },
    levels: {
        created_at: "2022-01-18T06:06:18.885Z",
        id: id,
        level_fame: 1,
        level_combat: 1,
        level_conjuring: 1,
        level_forging: 1,
        level_hunting: 1,
        level_jewelcrafting: 1,
        level_mastery: 1,
        level_mining: 1,
        level_quarrying: 1,
        level_woodcutting: 1,
        updated_at: "2022-01-18T06:06:18.885Z",
        xp_combat: 0,
        xp_conjuring: 0,
        xp_fame: 0,
        xp_forging: 0,
        xp_hunting: 0,
        xp_jewelcrafting: 0,
        xp_mastery: 0,
        xp_mining: 0,
        xp_quarrying: 0,
        xp_woodcutting: 0,
    },
    xpthresholds: {
        combat: 100,
        mining: 100,
        woodcutting: 100,
        hunting: 100,
        quarrying: 100,
        forging: 100,
        jewelcrafting: 100

    }

});
export const actionsummary = writable({

})
export const tickRec = writable('false')
export const type = writable('');


class Store {
    connectedSocket = null;

    async register(socket) {
        this.connectedSocket = socket;
        socket.on('update-user', (data) => SetUserData(data));
        socket.on('update-id', (value) => {
            id.set(value.id);
            console.log("works");
        });
        socket.on('pushuserdata', (data) => {
            console.log(data);
            userdata.set(data);
        })
    }


    async isSocketConnected() {
        return this.connectedSocket && this.connectedSocket.connected
    }
    
    async setActionData(actionData) {
        actions.set(actionData);
    }
    
    async setUserData(userData) {
        user.set(userData);
    }
    
    async sendAction(action, component) {
        if(this.isSocketConnected()) {
            this.connectedSocket.emit(`SendAction`, {action, component}, (status) => console.log(status));
        }
    }
}

export default new Store();