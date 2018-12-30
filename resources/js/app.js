
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('mapmaker-component', require('./components/Map/MapmakerComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


let gameScreen = document.getElementById('game-screen');
let settings = {
    upKey: 87, //w
    downKey: 83, //s
    leftKey: 65, //a
    rightKey: 68, //d

    gridSize: {
        w: 832 / 13,
        h: 1344 / 21
    }

};

let store = {
    'direction' : 'S', // N, E, S, W
    'position': {
        x: 0,
        y: 0
    }
};

let characterImg = new Image();
characterImg.src = '/images/characters/body/male/light.png';
let tileImg = null;
let tileWidth = null;
let tileHeight = null;
let mapData = null;
if (typeof (map) !== undefined && gameScreen) {
    tileImg = new Image();
    tileImg.src = map.tileset.url;
    mapData = JSON.parse(map.data);
    tileWidth = map.tileset.image_width / map.tileset.horizontal_length;
    tileHeight = map.tileset.image_height / map.tileset.vertical_length
}

function update() {
    // Update the state of the world for the elapsed time since last render
}


function draw() {
    let ctx = document.getElementById('game-screen').getContext('2d');
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    
    drawMap(ctx);
    drawCharacter(ctx);
}

function drawMap(ctx) {
    for (let i = 0; i < mapData.tileData.length; i++) {
        for (let j = 0; j < mapData.tileData[i].length; j++) {
            let tile = mapData.tileData[i][j];
            let sx = tile.x * tileWidth;
            let sy = tile.y * tileHeight;
            let swidth = tileWidth;
            let sheight = tileHeight;
            let x = tileWidth * i;
            let y = tileWidth * j;
            let width = swidth;
            let height = sheight;

            ctx.drawImage(
                tileImg,
                sx,
                sy,
                swidth,
                sheight,
                x,
                y,
                width,
                height
            );
        }
    }
}
function drawCharacter (ctx) {
    let characterWidth = settings.gridSize.w;
    let characterHeight = settings.gridSize.h;

    let sx = 0;
    let sy = characterHeight * 2;

    if (store.direction == 'N') {
        sx = 0;
        sy = 0;
    }
    if (store.direction == 'S') {
        sx = 0;
        sy = characterHeight * 2;
    }
    if (store.direction == 'E') {
        sx = 0;
        sy = characterHeight * 3;
    }
    if (store.direction == 'W') {
        sx = 0;
        sy = characterHeight;
    }

    let swidth = characterWidth;
    let sheight = characterHeight;

    let x = store.position.x;
    let y = store.position.y;
    let width = swidth;
    let height = sheight;

    ctx.drawImage(characterImg, sx, sy, swidth, sheight, x, y, width, height);
}


$(document).ready(() => {
    if (gameScreen) {
        

        function loop(timestamp) {
            var progress = timestamp - lastRender

            update(progress)
            draw()

            lastRender = timestamp
            window.requestAnimationFrame(loop)
        }
        var lastRender = 0
        window.requestAnimationFrame(loop)

        $(document).keydown((e)=>{
            if (e.keyCode == settings.upKey || e.keyCode == 38) {
                store.direction = 'N';
                store.position.y -= tileHeight;
            }
            if (e.keyCode == settings.downKey || e.keyCode == 40) {
                store.direction = 'S';
                store.position.y += tileHeight;
            }
            if (e.keyCode == settings.rightKey || e.keyCode == 39) {
                store.direction = 'E';
                store.position.x += tileWidth;
            }
            if (e.keyCode == settings.leftKey || e.keyCode == 37) {
                store.direction = 'W';
                store.position.x -= tileWidth;
            }
        });
    }
});
 

const app = new Vue({
    el: '#app'
});
