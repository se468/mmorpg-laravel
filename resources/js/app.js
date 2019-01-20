
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

import Display from './display'
window.Display = Display

import Hero from './hero'
window.Hero = Hero

import Monster from './monster'
window.Monster = Monster

import Map from './map'
window.Map = Map

import Tileset from './tileset'
window.Tileset = Tileset

if(window.loadGame) {
    window.GLOBAL = { //contains data related to game or drawing
        settings: {
            upKey: 87, //w
            downKey: 83, //s
            leftKey: 65, //a
            rightKey: 68, //d
            actionKey: 32 //space
        },
    }

    window.GAME_OBJECTS = {
        hero: new Hero(),
        monsters: {
            orc: new Monster(),
            skeleton: new Monster(),
        },
        map: new Map()
    }

    initializeMap()
    initializeCharacter()
    initializeMonsters()
}

function initializeCharacter () {
    window.GAME_OBJECTS.hero.setImage('/images/characters/body/male/light.png')
    window.GAME_OBJECTS.hero.setGridSize(832 / 13, 1344 / 21)
    window.GAME_OBJECTS.hero.setMap(window.GAME_OBJECTS.map)
    window.GAME_OBJECTS.hero.setPosition(10, 10)
    window.GAME_OBJECTS.hero.equipments.hair.src = '/images/characters/hair/male/messy1/black.png'
    window.GAME_OBJECTS.hero.equipments.feet.src = '/images/characters/feet/armor/male/golden_boots_male.png'
    window.GAME_OBJECTS.hero.equipments.legs.src = '/images/characters/legs/armor/male/golden_greaves_male.png'
    window.GAME_OBJECTS.hero.equipments.torso.src = '/images/characters/torso/gold/arms_male.png'
    window.GAME_OBJECTS.hero.equipments.righthand.src = '/images/characters/weapons/right hand/male/spear_male.png'
    window.GAME_OBJECTS.hero.equipments.lefthand.src = '/images/characters/weapons/left hand/male/shield_male_cutoutforbody.png'
    window.GAME_OBJECTS.map.addCharacter(window.GAME_OBJECTS.hero)
}

function initializeMonsters() {
    window.GAME_OBJECTS.monsters.orc.setImage('/images/characters/body/male/orc.png')
    window.GAME_OBJECTS.monsters.orc.setGridSize(832 / 13, 1344 / 21)
    window.GAME_OBJECTS.monsters.orc.setMap(window.GAME_OBJECTS.map)
    window.GAME_OBJECTS.monsters.orc.setPosition(5,5)
    window.GAME_OBJECTS.monsters.orc.equipments.righthand.src = '/images/characters/weapons/right hand/male/spear_male.png'
    window.GAME_OBJECTS.monsters.orc.equipments.legs.src = '/images/characters/legs/pants/male/magenta_pants_male.png'
    window.GAME_OBJECTS.monsters.orc.equipments.torso.src = '/images/characters/torso/leather/chest_male.png'
    window.GAME_OBJECTS.map.addCharacter(window.GAME_OBJECTS.monsters.orc)

    window.GAME_OBJECTS.monsters.skeleton.setImage('/images/characters/body/male/skeleton.png')
    window.GAME_OBJECTS.monsters.skeleton.setGridSize(832 / 13, 1344 / 21)
    window.GAME_OBJECTS.monsters.skeleton.setMap(window.GAME_OBJECTS.map)
    window.GAME_OBJECTS.monsters.skeleton.setPosition(12, 12)
    window.GAME_OBJECTS.monsters.skeleton.equipments.torso.src = '/images/characters/torso/shirts/longsleeve/male/teal_longsleeve.png'
    window.GAME_OBJECTS.monsters.skeleton.equipments.legs.src = '/images/characters/legs/pants/male/red_pants_male.png'
    window.GAME_OBJECTS.monsters.skeleton.equipments.righthand.src = '/images/characters/weapons/right hand/male/spear_male.png'
    window.GAME_OBJECTS.map.addCharacter(window.GAME_OBJECTS.monsters.skeleton)
}

function initializeMap () {
    window.GAME_OBJECTS.map.name = window.rawMapData.name
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
