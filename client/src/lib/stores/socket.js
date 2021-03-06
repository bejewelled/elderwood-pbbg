import { writable } from "svelte/store";
import Store from '$lib/stores/game';
import { ChatStore } from '$lib/stores/chat';

export const socket = writable(null);

socket.subscribe(async socket => {
    if(!socket) {
        return
    }
    
    socket.on(`connect`,() => {
        if(socket.connected) {
            socket.emit('`LoadUserData`', (data) => GameStore.setUserData(data));
            socket.emit(`LoadActionData`, (result) => GameStore.setActionData(result));
        }
    });

    Store.register(socket);

});
