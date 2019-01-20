class Map {
    constructor () {
        this.name = ""
        this.tileset = new Tileset()
        this.layers = []
        this.width = 1
        this.height = 1
        this.walkable = []
        this.characters = []
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
        this.layers.forEach((layer) => {
            for(let i = 0; i < layer.data.tiles.length; i ++) {
                let col = layer.data.tiles[i]
                for (let j = 0; j < col.length; j++) {
                    let tile = col[j]
                    if (tile.walkable != null) {
                        this.walkable[i][j] = this.walkable[i][j] & tile.walkable //0 아니면 1
                    }
                }
            }
        });
    }
    
    addCharacter(character) 
    {
        this.characters.push(character)
    }

    checkWalkable (x, y) {
        if(x >= this.walkable.length || x < 0) return false
        if(y >= this.walkable[x].length || y < 0) return false
        if(this.walkable[x][y] == 0) return false

        let result = true
        this.characters.forEach((character)=> {
            if (character.position && character.position.x == x && character.position.y == y)
                result = false
        })
        return result
    }

    attack(x,y,attacker) {
        this.characters.forEach((character) => {
            if (character.position && character.position.x == x && character.position.y == y) {
                character.takeDamage(attacker)
            }
        })
    }

    setDimensions(width, height) {
        this.width = width;
        this.height = height;
    }

    addBlankLayer () 
    {
        let newlayer = {}
        newlayer.data = {}
        newlayer.data.tiles = new Array(this.width).fill([])
        for (let j = 0; j < this.height; j++)
            newlayer.data.tiles[j] = (new Array(this.height)).fill({})
        
        newlayer.z_index = 0
        this.layers.push(newlayer)

        return newlayer
    }
    
    draw(ctx, selected = null, z_index = null) {
        this.layers.forEach((layer, index) => {
            if (this.shouldDrawLayer(layer, z_index)) {
                ctx.save();
                if (selected != null && index != selected) ctx.globalAlpha = 0.4;
                else ctx.globalAlpha = 1;

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
                ctx.restore();
            }
        })
    }

    shouldDrawLayer(layer, z_index) {
        return (layer.data.tiles && (z_index == null || layer.z_index == z_index))
    }
}

module.exports = Map;