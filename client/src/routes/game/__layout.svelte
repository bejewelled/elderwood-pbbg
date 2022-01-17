<script src="https://cdn.socket.io/4.4.0/socket.io.min.js">
    import {Progress} from 'sveltestrap'
    import { get } from 'svelte/store'
    import  Store from '$lib/stores/game'
import { onMount } from 'svelte';
    import {socket} from "$lib/stores/socket"
    import {id, nextClockTick, isActive} from "$lib/stores/user"
    import { Router, Route, Link } from "svelte-navigator";
    import {navigate} from "svelte-routing";
    import Gathering from '../actions/gathering.svelte'
    import * as ele from 'jquery'

    let uid = $id;

    // $: actionProgress =  () => {
    //     document.getElementById('action-timer').style.width = ($nextClockTick - date) / 60
    //     console.log(($nextClockTick - date) / 60);
    //     console.log("br");
    // };

    $: actionProgress = Math.round(($nextClockTick - date)/10) / 100
    // $: brr = console.log(($nextClockTick - date) / 60 + " math");
    // $: skrr = console.log(date + " date");
 //   $: brr = console.log(($nextClockTick - date) / 60);

    let date = new Date().getTime();

    function get__store(store) {
        let $val
        store.subscribe($ => $val = $)()
        return $val
    }
    onMount(async () => {
        const interval = setInterval(() => {
			date = new Date().getTime();
           // editWidth();
		}, 25);
        let connectedSocket = await io.connect('http://localhost:3333', {path: "/socket.io/", transports: ["websocket"], /*query: {token: $session.token}*/});
        socket.set(connectedSocket);
        $socket.emit('Test');
        $socket.on('tick', (data) => {
            //console.log(data.id);
            id.set(data.id);
            // username.set(data.username);
           // console.log("hello world");
        });
        $socket.on('clock-tick', (data) => {
            nextClockTick.set(data['nextTick']);
        })
        $socket.on('unauthorized', () => {
        });
        return () => {
			clearInterval(interval);
		};
    })
      

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms)); // resolve is a callback function
    }

    function queueGather() {
        isActive.set('false');
    }
    
    async function editWidth() {
        let res = ele('#action-timer').css("width", actionProgress);
    }
    async function startAction() {
        console.log("yo");
        const res = await fetch('http://localhost:3333/gathering/start', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id: get__store(id),
                actionclass: 'gather',
                type: 'woodcutting'
            })
      });   
    }

    // async function startaction() {
    //     const gatherstart = await fetch('http://localhost:3333/gathering/start', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({
    //             id: {$id}
    //         })
    //   });
    // }

</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
</svelte:head>
    <!-- Header -->
    <div class='wrapper--header wrapper header row py-2 px-1'>

        <div class='col-2 px-4'>
            <div class='row'style='padding-bottom: 2px'>
                <div class='col-5'>Gold</div>                
                <div class='col-7'>19,992,910,224</div>
            </div> 
            <div class='row'style='padding-bottom: 2px'>    
                <div class='col-5'>ID</div>
                <div class='col-7'>{$id}</div>
            </div> 
            <div class='row'style='padding-bottom: 2px'>
                <div class='col-5'>Runes</div>
                <div class='col-7'>99</div>  
            </div>  
            <div class='row'style='padding-bottom: 2px'>
                <div class='col-5 essencename'>Essence</div>
                <div class='col-7'>6</div>
            </div> 
            <!-- <div class='row'>
                <div class='col-5 iridiumname' style=''><strong>Iridium</strong></div>
                <div class='col-7'>{shardDisp}</div>  
            </div>   -->
        </div>
        <div class='col-5'>
            <div class='row' style='padding-bottom: 2px'>    
                <div class='col-3 px-0'><strong>Jewelcrafting Level 265</strong></div>
                <div class='col-8'><Progress value={12} max={17} color='info'
                    style="height: 18px" id='progress-mastery' striped
                    class='progressbar--mastery'>
                    </Progress></div>
            </div> 
            <div class='row' style='padding-bottom: 2px'>
                <div class='col-3 px-0'><strong>Mastery Level 4,227</strong></div>                
                <div class='col-8'> 
                    <div class='progress progress-striped active'>
                        <div class='progress-bar' style="width: 34%; background-color: red">Mastery Level 33</div>
                    </div>
                    <!-- <Progress value={8} max={23} color='success'
                    style="height: 18px" id='progress-mastery'striped
                    class='progressbar--mastery'>
                    </Progress></div> -->
                    </div>
            </div> 
            <div class='row' style='padding-bottom: 2px'>    
                <div class='col-3 px-0'><strong>Quest Progress</strong></div>
                <div class='col-8'><Progress value={11} max={116} color='dark'
                    style="height: 18px" id='progress-mastery'striped
                    class='progressbar--mastery'>
                    </Progress></div>
            </div> 
            <div class='row' style='padding-bottom: 2px'>    
                <div class='col-3 px-0'><strong>Guild Voyage Progress</strong></div>
                <div class='col-8'><Progress value={19} max={1766} color='dark'
                    style="height: 18px" id='progress-mastery'striped
                    class='progressbar--mastery'>
                    </Progress></div>
            </div>         
      </div>
            <div class='col-2 px-4'>
                <div class='row'>
                    <div class='col-5'>Gold</div>                
                    <div class='col-7'>19,992,910,224</div>
                </div> 
                <div class='row'>    
                    <div class='col-5'>ID</div>
                    <div class='col-7'>{$id}</div>
                </div> 
                <div class='row'>
                    <div class='col-5'>Runes</div>
                    <div class='col-7'>9</div>  
                </div>  
                <div class='row'>
                    <div class='col-5 essencename'>Essence</div>
                    <div class='col-7'>0</div>
                </div> 
                <!-- <div class='row'>
                    <div class='col-5 iridiumname' style=''><strong>Iridium</strong></div>
                    <div class='col-7'>{shardDisp}</div>  
                </div>   -->
            </div>
      

    </div>

    <!-- Spacer (something might go here eventually) -->
    <div class='row wrapper--spacer wrapper spacer py-2 px-1'>
    </div>

    <!-- Center Section (main) -->
    <div class='wrapper--main wrapper main row py-1 mx-2'>

        <!-- Sidebar Links -->
        <div class='col-1 mx-1 my-1 px-1 links wrapper wrapper--links'>
            <div class='row align-items-center links--label'>
                <strong>Home</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Profile</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Combat</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <a href='/game/gathering' on:click={queueGather} class='linkrefs'><strong>Gathering</strong></a>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Crafting</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Quests</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <a href='/auth/login' class='linkrefs'><strong>Robot</strong></a>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Guild</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Devotions</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Blessings</strong>
            </div>
            <div class='row links--spacer'></div>
            <div class='row align-items-center links--label'>
                <strong>Patch Notes</strong>
            </div>
            
        </div>

        <!-- Main Area -->
        <div class='col-8 mx-2 my-2 wrapper wrapper--maincenter maincenter'>
             
            <div class='row actiontimer justify-content-center action--bar'>
                Action Timer: {actionProgress} seconds
                <!-- <div class='progress' id='action-timerbase'>
                    <div id='action-timer' 
                    class='progress-bar' style='width: 3%'></div>  
                </div> -->
        </div>
            <div class='row spacer'></div>
            <Gathering />
            <div class='row common px-2'>Combat Attack Jewel {date}</div>
            <div class='row uncommon px-2'>Next Time {$nextClockTick}</div>
            <div class='row rare px-2'>Combat Attack Jewel {actionProgress}</div>
            <div class='row legendary px-2'>Combat Attack Jewel (+9.1%)</div>
            <div class='row divine px-2'>Combat Attack Jewel (+15.4%)</div>
            <div class='row mythical px-2'>Combat Attack Jewel (+27.5%)</div>
        </div>



        <div class='col-2 mx-1 my-1 wrapper'>
            test plerase??
        </div>
    </div>


    <!-- <Button on:click={startAction}>START</Button> --> 
<!-- </Button on:click = {startaction}>Start Ticks</Button> -->

<style>
    .wrapper {
        float: auto;
        border: 2px double black;
        font-size: 12px;
        font-family: 'Optima', sans-serif
    }

    .wrapper--links {
        font-size: 15px;
        font-family: 'Optima', sans-serif;
    }

    /* Sidebar navlinks */
    /* .links div {
        width: 93px; 
    } */


    .links--spacer {
        height:2px;
    }

    .spacer {
        height: 4px;
    }

    :global(.html) {
        background-color: rgb(208, 208, 208);
        font-family: 'Optima', sans-serif
    }

    .linkrefs {
        text-decoration: none;
        color: inherit;
        cursor: default;
    }
    .links--label, :global(.btn--main) {
        height: 33px;
        text-align: center;
        box-shadow: darkgray;
        background-color:rgb(210, 210, 210);
        color:rgb(31, 179, 31);
        font-size:13px;
        border: 1px solid gray;
        cursor: default;
    }

    .links--label:hover {
        background-color:rgb(189, 189, 189);
        transition-duration: 0.2s;

    }
    /* background color */
    .wrapper--maincenter, :global(.wrapper) {
        background-color: rgb(237, 237, 237);
        color: rgb(108, 108, 108);
    }

    #action-timer {
        transition-duration: 0.02s;
    }

    #action-timer {
        -webkit-transition: none;
        -moz-transition: none;
        -ms-transition: none;
        -o-transition: none;
        transition: none;
        background-color: rgb(20, 196, 0);
        height: 5px;
    }



    .iridiumname {
        color: rgb(42, 207, 182);
    }

    .progressbar--mastery {
        transition-duration: 0.01s;
    }

    .body {
        color: rgb(171, 102, 102);
    }

    /* defines global styles for rarities. Easy to apply on anything.*/
    :global(.common) {
        color: black;
    }
    :global(.uncommon) {
        color: rgb(31, 179, 31);
    }
    :global(.rare) {
        color: rgb(41, 203, 239);
    }
    :global(.legendary) {
        color: rgb(149, 40, 217);
    }
    :global(.divine) {
        font-weight: bold;
        color: rgb(244, 201, 27);
    }
    :global(.mythical) {
        font-weight: bold;
        color: rgb(240, 30, 132);
    }
</style>