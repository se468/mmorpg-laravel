<template>
    <div class="row">
        <div class="col-md-8">
            <canvas id="mapmaker-map" 
                class="mapmaker-map" 
                width="600" 
                height="400">
            </canvas>
        </div>
        <div class="col-md-4">
            <div class="mb-4">
                <template v-for="tile in map.tileset.tiles">
                    <canvas 
                        class="mapmaker-tile mr-1"
                        v-bind:id="'tile_' + tile.id" 
                        v-bind:width="getTileWidth(map.tileset)" 
                        v-bind:height="getTileHeight(map.tileset)"
                        v-bind:class="{
                            'selected': (tile == selectedTile)
                        }"
                        @click="selectedTile = tile">
                    </canvas>
                </template>
            </div>

            <div>
                <button @click="store()" class="btn btn-primary btn-block">Save</button>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['map'],
        data() {
            return {
                canvas: null,
                tileImg: new Image(),
                selectedTile: null,
                mousedown: false,
                mapData: {
                    w: 640,
                    h: 480,
                    tileData: []
                }
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

                if(this.map.data) {
                    this.mapData = JSON.parse(this.map.data);
                }
                else {
                    let numMapCols = Math.ceil(this.mapData.w / this.getTileWidth(this.map.tileset));
                    let numMapRows = Math.ceil(this.mapData.h / this.getTileHeight(this.map.tileset));
                    this.mapData.tileData = [];
                    for(let i = 0; i < numMapCols; i ++) {
                        this.mapData.tileData[i] = [];
                        for (let j = 0; j < numMapRows; j ++) {
                            this.mapData.tileData[i][j] = {}; // add empty object for now
                        }
                    }
                }

                this.tileImg.src = this.map.tileset.url;
                this.tileImg.onload = () => {
                    this.drawTiles();
                    this.drawMap();
                };

                this.canvas.addEventListener("mousemove", (e) => {
                    if(this.mousedown) {
                        let x = e.clientX - e.target.getBoundingClientRect().x;
                        let y = e.clientY - e.target.getBoundingClientRect().y;
                        let grid = this.getGrid(x, y);
                        this.mapData.tileData[grid.x][grid.y] = JSON.parse(JSON.stringify(this.selectedTile));
                        this.drawMap();
                    }
                }, false);
                this.canvas.addEventListener("mousedown", (e) => {
                    let x = e.clientX - e.target.getBoundingClientRect().x;
                    let y = e.clientY - e.target.getBoundingClientRect().y;
                    let grid = this.getGrid(x, y);
                    this.mousedown = true;
                    this.mapData.tileData[grid.x][grid.y] = JSON.parse(JSON.stringify(this.selectedTile));
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
                let gridX = (x) / this.getTileWidth(this.map.tileset);
                let gridY = (y) / this.getTileHeight(this.map.tileset);

                return {
                    x: Math.floor(gridX), 
                    y: Math.floor(gridY)
                };
            },

            drawMap () {
                for(let i = 0; i < this.mapData.tileData.length; i ++) {
                    for(let j = 0; j < this.mapData.tileData[i].length; j ++) {
                        let tile = this.mapData.tileData[i][j];
                        if(tile.id) { 
                            let sx = tile.x * this.getTileWidth(this.map.tileset);
                            let sy = tile.y * this.getTileHeight(this.map.tileset);
                            let swidth = this.getTileWidth(this.map.tileset);
                            let sheight = this.getTileHeight(this.map.tileset);
                            let x = this.getTileWidth(this.map.tileset) * i;
                            let y = this.getTileWidth(this.map.tileset) * j;
                            let width = swidth;
                            let height = sheight;
                            this.canvas.getContext('2d').drawImage(
                                this.tileImg, 
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
            },

            drawTiles() {
                for(let i = 0; i < this.map.tileset.tiles.length; i ++) {
                    let tile = this.map.tileset.tiles[i];
                    let tileCanvas = document.getElementById('tile_' + tile.id);
                    let ctx = tileCanvas.getContext('2d');

                    let sx = tile.x * this.getTileWidth(this.map.tileset);
                    let sy = tile.y * this.getTileHeight(this.map.tileset);
                    let swidth = this.getTileWidth(this.map.tileset);
                    let sheight = this.getTileHeight(this.map.tileset);


                    ctx.drawImage(this.tileImg, sx, sy, swidth, sheight,0,0,swidth, sheight);
                }
            },

            getTileWidth(tileset) {
                return tileset.image_width/tileset.horizontal_length;
            },
            getTileHeight(tileset) {
                return tileset.image_height/tileset.vertical_length;
            },

            store () {
                let url = "/map/" + this.map.id;
                let data = {
                    'mapData': JSON.stringify(this.mapData)
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