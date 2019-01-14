<template>
    <div class="row">
        <div class="col-md-9">
            <div class="mb-4">
                <div class="btn-group btn-group-sm" role="group">
                    <template v-for="(layer, ind) in this.gameObjects.map.layers">
                        <button type="button" class="btn btn-sm btn-secondary" 
                            @click="selectLayer(ind)"
                            v-bind:class="{'active' : selectedLayer == ind }">
                            {{ ind }}
                        </button>
                    </template>
                
                    <button type="button" class="btn btn-sm btn-secondary" @click="createLayer()">+</button>
                </div>

                <button class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#layer-settings">Layer Settings</button>
                <button class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#map-settings">Map Settings</button>
            </div>
            
            <div class="w-100" style="overflow: auto; height: 500px;">
                <canvas id="mapmaker-map" 
                    class="mapmaker-map" 
                    v-bind:width="gameObjects.map.width * gameObjects.map.tileset.tileSize.w" 
                    v-bind:height="gameObjects.map.height * gameObjects.map.tileset.tileSize.h">
                </canvas>
            </div>
            
        </div>
        <div class="col-md-3">
            <div class="mb-4">
                <button @click="store()" class="btn btn-primary btn-block">Save</button>
            </div>
           
            <div class="mb-4">   
                <div class="btn-group">
                    <button class="btn btn-secondary" v-bind:class="{'active': selectedTool == 0}" @click="selectedTool = 0">
                        <img src="/images/icons/icons8-pencil.png" width="16" height="16">
                    </button>
                    <button class="btn btn-secondary" v-bind:class="{'active': selectedTool == 1}" @click="selectedTool = 1">
                        <img src="/images/icons/icons8-eraser.png" width="16" height="16">
                    </button>
                    <button class="btn btn-secondary" v-bind:class="{'active': selectedTool == 2}" @click="selectedTool = 2">
                        <img src="/images/icons/icons8-fill_color.png" width="16" height="16">
                    </button>
                    <button class="btn btn-secondary" v-bind:class="{'active': selectedTool == 3}" @click="selectedTool = 3">
                        <img src="/images/icons/icons8-rectangle_stroked.png" width="16" height="16">
                    </button>
                </div>
            </div>
            <div class="mb-4"  style="overflow: auto; height: 500px;">
                <div v-bind:style="{
                    'width' :((gameObjects.map.tileset.tileSize.w + 10) * gameObjects.map.tileset.data.horizontal_length) + 'px'
                }">
                    <template v-for="tile in map.tileset.tiles">
                        <canvas 
                            class="mapmaker-tile mr-1"
                            v-bind:id="'tile_' + tile.id" 
                            v-bind:width="gameObjects.map.tileset.tileSize.w" 
                            v-bind:height="gameObjects.map.tileset.tileSize.h"
                            v-bind:class="{
                                'selected': (tile == selectedTile)
                            }"
                            @click="selectedTile = tile">
                        </canvas>
                    </template>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="map-settings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">

                        <div class="form">
                            <div class="font-weight-bold">Map Settings</div>
                            <div class="form-group">
                                <label>Map Width (# Grids)</label>
                                <input type="text" class="form-control" v-bind:value="gameObjects.map.width">
                            </div>
                            <div class="form-group">
                                <label>Map Height (# Grids)</label>
                                <input type="text" class="form-control" v-bind:value="gameObjects.map.height">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="layer-settings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="form">
                            <div class="font-weight-bold">Layer Settings</div>
                            <div class="form-group">
                                <label>z-index: </label>
                                <select v-model="gameObjects.map.layers[selectedLayer].z_index">
                                    <option value="0">Below Character</option>
                                    <option value="20">On top of Character</option>
                                </select>
                            </div>
                            <button @click="updateLayerSettings()" class="btn btn-primary btn-sm">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>


<script>
    let TOOLS = {
        PENCIL : 0,
        ERASER : 1,
        FILL: 2,
        RECTANGLE: 3
    }


    export default {
        props: ['map'],
        data() {
            return {
                global: window.GLOBAL,
                gameObjects: window.GAME_OBJECTS,
                canvas: null,
                tileImg: new Image(),
                selectedTile: null,
                mousedown: false,

                numLayers: 1,
                selectedLayer: 0,

                selectedTool: TOOLS.PENCIL
            }
        },

        ready() {
            this.prepareComponent();
        },

        mounted() {
            this.prepareComponent();
        },

        methods: {
            prepareComponent() {
                this.canvas = document.getElementById('mapmaker-map');
                
                this.gameObjects.map.tileset.image.onload = ()=>{
                    this.drawTiles();
                    this.drawMap();
                }

                this.canvas.addEventListener("mousemove", (e) => {
                    if(this.mousedown) {
                        let x = e.clientX - e.target.getBoundingClientRect().x;
                        let y = e.clientY - e.target.getBoundingClientRect().y;
                        let grid = this.getGrid(x, y);

                        if(this.selectedTool == TOOLS.PENCIL) {
                            this.gameObjects.map.layers[this.selectedLayer].data.tiles[grid.x][grid.y] = JSON.parse(JSON.stringify(this.selectedTile));
                        }
                        else if (this.selectedTool == TOOLS.ERASER) {
                            this.gameObjects.map.layers[this.selectedLayer].data.tiles[grid.x][grid.y] = {};
                        }
                        this.drawMap();
                    }
                }, false);

                this.canvas.addEventListener("mousedown", (e) => {
                    let x = e.clientX - e.target.getBoundingClientRect().x;
                    let y = e.clientY - e.target.getBoundingClientRect().y;
                    let grid = this.getGrid(x, y);
                    this.mousedown = true;

                    if(this.selectedTool == TOOLS.PENCIL) {
                        this.gameObjects.map.layers[this.selectedLayer].data.tiles[grid.x][grid.y] = JSON.parse(JSON.stringify(this.selectedTile));
                    }
                    else if (this.selectedTool == TOOLS.ERASER) {
                        this.gameObjects.map.layers[this.selectedLayer].data.tiles[grid.x][grid.y] = {};
                    }

                    this.drawMap();
                }, false);

                this.canvas.addEventListener("mouseup", (e) => {
                    this.mousedown = false;
                }, false);

                this.canvas.addEventListener("mouseout", (e) => {
                    this.mousedown = false;
                }, false);
            },
            getGrid(x, y) {
                let gridX = (x) / this.gameObjects.map.tileset.tileSize.w;
                let gridY = (y) / this.gameObjects.map.tileset.tileSize.h;

                return {
                    x: Math.floor(gridX), 
                    y: Math.floor(gridY)
                };
            },

            drawMap () {
                this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.gameObjects.map.draw(this.canvas.getContext('2d'),this.selectedLayer);
            },

            drawTiles() {
                for(let i = 0; i < window.rawMapData.tileset.tiles.length; i ++) {
                    let tile = window.rawMapData.tileset.tiles[i];
                    if(document.getElementById('tile_' + tile.id))
                    {
                        let ctx = document.getElementById('tile_' + tile.id).getContext('2d');
                        this.gameObjects.map.tileset.draw(ctx, tile, 0, 0);
                    }
                }
            },

            createLayer () {
                this.gameObjects.map.addBlankLayer()

                this.drawMap()
            },

            selectLayer (ind) {
                this.selectedLayer = ind
                this.drawMap()
            },

            updateLayerSettings() {
                let url = "/layer/" + this.gameObjects.map.layers[this.selectedLayer].id;
                let data = {
                    'z_index': this.gameObjects.map.layers[this.selectedLayer].z_index
                }
                axios.put(url, data)
                    .then(function (response) {
                        console.log(response);
                        alert(response.data.status);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            store () {
                let url = "/map/" + this.map.id;

                let layersData = []
                this.gameObjects.map.layers.forEach((layer)=>{
                    layersData.push({
                        z_index: layer.z_index,
                        data: JSON.stringify(layer.data)
                    })
                })
                let data = {
                    'layersData': layersData
                };

                axios.put(url, data)
                    .then(function (response) {
                        console.log(response);
                        alert(response.data.status);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>