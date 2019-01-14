
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

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Character from './character';
window.Character = Character;

import Map from './map';
window.Map = Map;

import Tileset from './tileset';
window.Tileset = Tileset;

if(window.loadGame) {
    window.GLOBAL = { //contains data related to game or drawing
        settings: {
            upKey: 87, //w
            downKey: 83, //s
            leftKey: 65, //a
            rightKey: 68, //d
        },
    };

    window.GAME_OBJECTS = {
        character: new Character(),
        map: new Map()
    };

    initializeMap();
    initializeCharacter();
    
}

function initializeCharacter () {
    window.GAME_OBJECTS.character.setImage('/images/characters/body/male/light.png');
    window.GAME_OBJECTS.character.setGridSize(832 / 13, 1344 / 21);
    window.GAME_OBJECTS.character.setMap(window.GAME_OBJECTS.map);
}

function initializeMap () {
    
    window.GAME_OBJECTS.map.setDimensions(window.rawMapData.width, window.rawMapData.height);
    if (window.rawMapData.layers.length > 0 && window.rawMapData.layers[0].data) { 
        let layers = [];
        window.rawMapData.layers.forEach((l) => {
            l.data = JSON.parse(l.data)
            layers.push(l)
        });
        window.GAME_OBJECTS.map.setLayers(layers);
    }
    else { 
        window.GAME_OBJECTS.map.addBlankLayer();
    }

    window.GAME_OBJECTS.map.tileset.setData(window.rawMapData.tileset);
}

const app = new Vue({
    el: '#app'
});
