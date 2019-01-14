class Map {
    constructor () {
        this.tileset = new Tileset();
        this.layers = [];
        this.width = 1;
        this.height = 1;
        this.walkable = [];
    }
    
    setLayers (layers) {
        this.layers = layers;
        
        for (let i = 0; i < this.layers[0].data.tiles.length; i++) {
            let col = this.layers[0].data.tiles[i]
            this.walkable.push([])
            for (let j = 0; j < col.length; j++) {
                this.walkable[i].push(1)
            }
        }
        //generate walkable map for walkability
        this.layers.forEach((layer, index) => {
            for(let i = 0; i < layer.data.tiles.length; i ++) {
                let col = layer.data.tiles[i]
                for (let j = 0; j < col.length; j++) {
                    let tile = col[j]
                    if (tile.walkable != null) {
                        this.walkable[i][j] = this.walkable[i][j] & tile.walkable
                    }
                }
            }
        });
    }

    checkWalkable (x, y) {
        if (x >= this.walkable.length || x < 0) return false
        if (y >= this.walkable[x].length || y < 0) return false
        if(this.walkable[x][y] == 0) return false
        return true
    }

    setDimensions(width, height) {
        this.width = width;
        this.height = height;
    }

    addBlankLayer () 
    {
        let newlayer = {};
        newlayer.data = {};
        newlayer.data.tiles = new Array(this.width).fill([]);
        for (let j = 0; j < this.height; j++) {
            newlayer.data.tiles[j] = (new Array(this.height)).fill({});
        }
        newlayer.z_index = 0;
        this.layers.push(newlayer)

        return newlayer;
    }

    draw(ctx, selected=null, z_index= null) {
        this.layers.forEach((layer, index) => {
            if (layer.data.tiles && (z_index == null || layer.z_index == z_index)) {
                if(selected !=null && index != selected) {
                    ctx.save();
                    ctx.globalAlpha = 0.4;
                }
                else if (selected == null || selected == index) {
                    ctx.save();
                    ctx.globalAlpha = 1;
                }

                layer.data.tiles.map((col, i) => {
                    col.map((tile, j) => {
                        this.tileset.draw(
                            ctx,
                            tile,
                            i * this.tileset.tileSize.w,
                            j * this.tileset.tileSize.h,
                        );
                       
                    });
                });
                if (selected != null && layer != selected) {
                    ctx.restore();
                }
            }
        })
    }
}

module.exports = Map;