class Display {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')

        this.map = window.GAME_OBJECTS.map
        this.hero = window.GAME_OBJECTS.hero
        this.monsters = window.GAME_OBJECTS.monsters
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawMap(null, 0)
        for (let key in this.monsters)
            this.drawCharacter(this.monsters[key])
        
        this.drawCharacter(this.hero)
        this.drawMap(null, 20)
    }

    /** Map Drawing */
    drawMap(selected = null, z_index = null) {
        this.map.layers.forEach((layer, index) => {
            if (this.shouldDrawLayer(layer, z_index)) {
                this.ctx.save();
                if (selected != null && index != selected) this.ctx.globalAlpha = 0.4
                else this.ctx.globalAlpha = 1

                layer.data.tiles.map((col, i) => {
                    col.map((tile, j) => {
                        this.map.tileset.draw(
                            this.ctx,
                            tile,
                            i * this.map.tileset.tileSize.w,
                            j * this.map.tileset.tileSize.h,
                        );

                    });
                });
                this.ctx.restore();
            }
        })
    }

    shouldDrawLayer(layer, z_index) {
        return (layer.data.tiles && (z_index == null || layer.z_index == z_index))
    }

    /** Character Drawing */
    drawCharacter (character) {
        let characterWidth = character.gridSize.w
        let characterHeight = character.gridSize.h

        let spos = this.getSpritePosition(character)
        let sx = spos.x
        let sy = spos.y

        let swidth = characterWidth
        let sheight = characterHeight


        let x = character.animating ? character.prevPosition.x + (character.position.x - character.prevPosition.x) * character.motion / (2 * character.frames) : character.position.x
        x *= character.map.tileset.tileSize.w
        x -= character.map.tileset.tileSize.w / 2

        let y = character.animating ? character.prevPosition.y + (character.position.y - character.prevPosition.y) * character.motion / (2 * character.frames) : character.position.y
        y *= character.map.tileset.tileSize.h
        y -= character.gridSize.h / 2

        let width = swidth
        let height = sheight

        this.ctx.save();
        if (character.gotAttacked && character.state == STATE.IN_COMBAT) this.ctx.globalAlpha = 0.4;
        else this.ctx.globalAlpha = 1;

        this.ctx.drawImage(character.image, sx, sy, swidth, sheight, x, y, width, height)

        for (let key in character.equipments) {
            this.ctx.drawImage(character.equipments[key], sx, sy, swidth, sheight, x, y, width, height)
        }

        this.ctx.restore();
    }

    getSpritePosition(character) {
        let characterWidth = character.gridSize.w
        let characterHeight = character.gridSize.h

        if (character.state == STATE.DEAD)
            return { x: characterWidth * 5, y: 20 * characterHeight }

        let sx = characterWidth * Math.round(character.motion / 2)
        let sy = characterHeight * 2

        if (character.direction == 'N') {
            if (character.state == STATE.ATTACKING) sy = 4 * characterHeight
            else if (character.state == STATE.DYING) sy = 20 * characterHeight
            else sy = 8 * characterHeight
        }
        if (character.direction == 'W') {
            if (character.state == STATE.ATTACKING) sy = 5 * characterHeight
            else if (character.state == STATE.DYING) sy = 20 * characterHeight
            else sy = 9 * characterHeight
        }
        if (character.direction == 'S') {
            if (character.state == STATE.ATTACKING) sy = 6 * characterHeight
            else if (character.state == STATE.DYING) sy = 20 * characterHeight
            else sy = 10 * characterHeight
        }
        if (character.direction == 'E') {
            if (character.state == STATE.ATTACKING) sy = 7 * characterHeight
            else if (character.state == STATE.DYING) sy = 20 * characterHeight
            else sy = 11 * characterHeight
        }
        return { x: sx, y: sy }
    }
}

module.exports = Display;