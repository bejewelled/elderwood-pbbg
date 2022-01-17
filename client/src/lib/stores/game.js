import { writable } from "svelte/store";

export const actions = writable({});
export const user = writable({});
export const id = writable(0);

class Store {
    connectedSocket = null;

    async register(socket) {
        this.connectedSocket = socket;
        socket.on('update-user', (data) => SetUserData(data));
        socket.on('update-id', (value) => {
            id.set(value.id);
            console.log("works");
        });
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