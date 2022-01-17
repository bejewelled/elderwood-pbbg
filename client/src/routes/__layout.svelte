
<script>
    import { session } from '$app/stores';
    import { socket } from '$lib/stores/socket';
    import { onMount, onDestroy } from 'svelte';



    onMount(async () => {
        if($session.user) {
            let connectedSocket = io.connect(`${window.location.origin}`, {path: "/server/socket.io/", transports: ["websocket"], query: {token: $session.token}});
            socket.set(connectedSocket);
            $socket.emit('Test');
        }
    });

    onDestroy(async () => {
        if($socket) {
            $socket.disconnect();
            socket.set(null);
        }
    });
</script>

<slot />