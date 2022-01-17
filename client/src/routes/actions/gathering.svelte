<script>
    import { onMount } from 'svelte';
    import {Container, Row, Col, NavLink, Nav, Navbar} from 'sveltestrap'
    import {actionclass, isActive} from '$lib/stores/user'
    import {socket} from '$lib/stores/socket'
import Combat from '../game/combat.svelte';
import * as ele from 'jquery';
import {id, nextClockTick, currres, currtype} from '$lib/stores/user'

    let type;
    let resourceLabel;
    let tool = 'unknown tool';
    let active = $isActive;
    let flavor = ' to gather some A#*U8D(@U@!OCIX^.';

    $toold: tool;


    isActive.set('false');

    console.log(active);

    onMount(async () => {
        type = {$currtype};
        resourceLabel = {$currres};
        let connectedSocket = await io.connect('http://localhost:3333', {path: "/socket.io/", transports: ["websocket"], /*query: {token: $session.token}*/});
        socket.set(connectedSocket);
        $socket.emit('Test');
        $socket.on('gather-result', (data) => {
            isActive.set('true');
            changeFlavorText(type);
            updateDisplay(data);
        })
        $socket.on('unauthorized', () => {
            console.log("WEOAH")
        })
        $socket.on('testing', (data) => {
            console.log(data);
        })
        $socket.on('tick', (data) => {

        })
    })

    function changeFlavorText(type) {
        let flavors = [
            ' and hope you don\'t accidentally hit yourself with it.',
            ' with an aggression so pronounced, you swear you hear an animal gasp.',
            ' but aren\'t really feeling it today. ',
            '. Did you know there is only a 0.005% chance to see this flavor text?'
        ]
        switch(type) {
            case 'mining':
                tool = 'pickaxe';
                resourceLabel = 'copper';
                break;
            case 'woodcutting':
                tool = 'axe';
                resourceLabel = 'wood';
                break;
            case 'hunting':
                tool = 'hatchet';
                resourceLabel = 'food';
                break;
            case 'quarrying':
                tool = 'drill';
                resourceLabel = 'stone';
                break;
        }

        flavor =' to get some resources! And hopefully more...';
        let rand = Math.random();
        if (rand > 0.999995) {
            flavor = flavors[3];
        } else if (rand > 0.99) {
            flavor = flavors[2];
        } else if (rand > 0.96) {
            flavor = flavors[1];
        } else if (rand > 0.9) {
            flavor = flavors[0];
        }
    }

    
    async function startGathering() {
        isActive.set('true');
        let thistype = ele('#gather-type-selector').find('option:selected').text();
        switch (thistype) {
            case 'Mining':
                type = 'mining';
                break;
            case 'Woodcutting':
                type = 'woodcutting';
                break;
            case 'Hunting':
                type = 'hunting';
                break;
            case 'Quarrying':
                type = 'quarrying';
                break;
        }
        currtype.set(type);
        currres.set(resourceLabel);

         await fetch('http://localhost:3333/gathering/start', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                actionclass: 'gather',
                type: type,
                id: 1
            })
         })

    }


    let resgain = 0;
    let xpgain = 0;
    async function updateDisplay(data) {
        console.log(resourceLabel);
        resgain = data[resourceLabel];
        console.log(resgain);
    }

    </script>
    
    <main>
        <div class='py-1 wrapper wrapper--gathering container'>
            <div class='row px-1 py-1 gathering--title justify-content-center wrapper'>
                {#if ($isActive === 'false')}
                Choose your gathering action:
                {/if}
                {#if $isActive === 'true'}
                    You swing your {tool}{flavor}
                {/if}
            </div>

            <div class='row px-1 py-2 gathering--results justify-content-center wrapper'>
                {#if $isActive === 'false'}
                <div class='col choose--gather'>
                    <form id='gather-type-selector' on:submit|preventDefault={startGathering}>
                        <select class='form-select' style='background-color: #feeeef'>
                            <option>Mining</option>
                            <option>Woodcutting</option>
                            <option>Hunting</option>
                            <option>Quarrying</option>
                        </select>
                        <button type='submit' class='btn--main btn--start-gathering'>Start</button>
                    </form>
                </div>

                {/if}
                {#if $isActive === 'true'}
                <div class='col'>
                    <strong><div class='row justify-content-center'>You have gained {resgain} {resourceLabel}.</div></strong>
                    <div class='row justify-content-center'>Pure Resources: 116</div>
                    <div class='row justify-content-center'>Additional Base Resources: 2,226</div>
                    <div class='row justify-content-center'>Equipment Bonus: 216.64%</div>
                    <div class='row justify-content-center'>Guild Bonus: 56.92%</div>
                    <div class='row justify-content-center'>Other Bonuses: 332%</div>
                    <hr />
                    <div class='row justify-content-center luck--roll'>Luck this Action: 23</div>
                </div>


            {/if}
        </div>
        </div>
    </main> 
    
    <style scoped>

    .btn--main:hover {
        background-color:rgb(189, 189, 189);
        transition-duration: 0.2s;
    }
    .drop--results {
        width: 100%;
    }
    .wrapper {
        border: 2px double black;
    }
    .wrapper--gathering {
        padding-left: 10px;
        padding-right: 10px;
    }
    hr {
        margin-bottom: 7px;
        margin-top: 7px;
        border-top: 4px;
    }
    </style>