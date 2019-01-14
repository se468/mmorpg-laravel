<template>
    <div>
        <div class="mb-4">
            <button class="btn btn-primary btn-block" @click="store()">Save Walkable Tiles</button>
        </div>
        <div style="overflow: auto; height: 600px;">
            <div v-bind:style="{
                'width' :((tilesetObj.tileSize.w + 10) * tilesetObj.data.horizontal_length) + 'px'
            }">
                <template v-for="tile in tileset.tiles">
                    <canvas 
                        class="mapmaker-tile mr-1"
                        v-bind:id="'tile_' + tile.id" 
                        v-bind:width="tileset.image_width / tileset.horizontal_length" 
                        v-bind:height="tileset.image_height / tileset.vertical_length"
                        v-bind:class="{
                            'selected': (tile.walkable == 0)
                        }"
                        @click="tile.walkable = !tile.walkable">
                    </canvas>
                </template>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ["tileset"],
        data() {
            return {
                tilesetObj: new Tileset()
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
                this.tilesetObj.setData(this.tileset)

                this.tilesetObj.image.onload = ()=>{
                    this.draw()
                }
            },

            draw() {
                for(let i = 0; i < this.tileset.tiles.length; i ++) {
                    let tile = this.tileset.tiles[i];
                    if(document.getElementById('tile_' + tile.id))
                    {
                        let ctx = document.getElementById('tile_' + tile.id).getContext('2d');
                        this.tilesetObj.draw(ctx, tile, 0, 0);
                    }
                }
            },

            store () {
                let url = "/tileset/" + this.tileset.id;
                let data = {
                    tiles: this.tileset.tiles
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