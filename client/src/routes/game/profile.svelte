<script>
import { onMount } from 'svelte';
import {Container, Row, Col, NavLink, Nav, Navbar} from 'sveltestrap'
import Navigation from '../components/navigation.svelte';
// import {socket} from '$lib/stores/socket'
// onMount(async() => {
//   let connectedSocket = io.connect(`${window.location.origin}`, {path: "/server/socket.io/", transports: ["websocket"], /*query: {token: $session.token}*/});
//   socket.set(connectedSocket);
// })
</script>




<style global>
  .html {
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
  }
</style>