
<script>

    import { Form, FormGroup, Input, Label, Button, Icon, Alert } from "sveltestrap";  
    import { goto } from '$app/navigation';
import { onMount } from "svelte";
    import {socket} from '$lib/stores/socket'
    import {id, username} from "$lib/stores/user"
    import Gathering from '../actions/gathering.svelte'

    // @ts-ignore
    const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
    ];

    let authenticated = 'false';
    
    onMount(async () => {
        let connectedSocket = await io.connect('http://localhost:3333', {path: "/socket.io/", transports: ["websocket"], /*query: {token: $session.token}*/});
        socket.set(connectedSocket);
    })
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms)); // resolve is a callback function
    }
    async function submit() {
        const loginres = await fetch('http://localhost:3333/auth/login/confirm', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: inputusername,
                password: inputpassword
            })
      });
      const login = loginres.json()
      .then((data) => {
        console.log(data['id'][0]['id']);
        id.set(data['id'][0]['id']); // set user id
        console.log(id);
        const c = id;
        window.sessionStorage.setItem('user-id', $id);
      });

      if (loginres.status === 401) {
        statusHeader = 'Authentication Error'
        statusColor = 'danger'
        statusMessage = 'It looks like your username or password is incorrect.'
      } else {
        statusHeader = 'Success!'
        statusColor='success'
        statusMessage = 'Success! You will now be redirected.'
        statusReturned = true;
        sleep(3000);
        goto('/game/profile');
      }

    }

    let inputusername = '';
    let inputpassword = '';

    // Information about the status of login (for the user)
    let statusReturned = false;
    let statusHeader = 'Welcome!';
    let statusMessage = 'New to Elderwood? Make sure to register before logging in!';
    let statusColor = 'info';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<script src="https://cdn.socket.io/4.4.0/socket.io.min.js" />
</svelte:head>
<main>
    <div class='wrapper wrapper--navbar'>
    </div>
    {#if authenticated === 'true'}
    <div>
        <h2 class='error--authenticated'>
         <Icon name="exclamation-circle" /> Authentication Error
        </h2>
        <h4 class='error--authenticated'>
            How did you get here? You're already logged in, so you can go back home now.
        </h4>
    </div>
        <Button size="lg" href='/game/profile'>Profile</Button>
    {/if}
    {#if authenticated === 'false'} 
    <div class='wrapper wrapper--login'>
    GELKLASDASD
    <Form>
        <FormGroup>
            <Label class='input' for="exampleUsername">Username</Label>
            <Input
              type="text"
              name="username"
              bind:value = {inputusername}
              id="exampleUsername"			
              placeholder="Enter username"/>
        </FormGroup>


            <FormGroup>
                <Label for="examplePass">Password</Label>
                <Input
                  type="password"
                  name="password"
                  bind:value={inputpassword}
                  id="examplePass"
                  placeholder="Enter inputpassword"
                />
              </FormGroup>
            </Form>
        </div>
        
            <Button color='info' on:click={submit}>
                Submit
            </Button>
            <!--//@ts-ignore-->
            <div class='wrapper wrapper--login-status'>
                <Alert 
                color={statusColor} class='login-status'>
                    <h4 class='header--login-status'>{statusHeader}</h4>
                    {statusMessage}
                {#if !statusReturned}
                    <a class='alert-link' href='/auth/register'>Register Here</a>
                {/if}
                </Alert>
            </div>
    {/if}

</main>

<style>
    .error--authenticated {
        padding: 6px;
        color: #e3223f;
    }
    .wrapper--login-status {
        padding: 15px 7px;
        vertical-align: middle;
    }
</style>