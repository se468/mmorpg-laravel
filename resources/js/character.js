class Character {
    constructor () {
        this.image = new Image();
        this.gridSize = {
            w: 0,
            h: 0
        };
        this.direction = 'S';
        this.position = { // in terms of grid x y, not in pixels
            x: 0,
            y: 0
        };

        this.map = null;

        this.mapTileSize = { //for movement
            w: 1,
            h: 1
        };
    }
    
    moveUp() {
        this.setDirection('N');
        if(this.map.checkWalkable(this.position.x, this.position.y - 1))
            this.position.y -= 1;
    }

    moveDown() {
        this.setDirection('S');
        if (this.map.checkWalkable(this.position.x, this.position.y + 1))
            this.position.y += 1;
    }

    moveRight() {
        this.setDirection('E');
        if (this.map.checkWalkable(this.position.x + 1, this.position.y))
            this.position.x += 1;
    }

    moveLeft(){
        this.setDirection('W');
        if (this.map.checkWalkable(this.position.x - 1, this.position.y))
            this.position.x -= 1;
    }

    setImage(src) {
        this.image.src = src;
    }

    setGridSize(w, h) {
        this.gridSize.w = w;
        this.gridSize.h = h;
    }

    setMap (map) {
        this.map = map;
    }
    setDirection(dir) {
        this.direction = dir;
    } 

    setPosition(x , y) {
        this.position.x = x;
        this.position.y = y;
    }


    draw(ctx) {
        let characterWidth = this.gridSize.w;
        let characterHeight = this.gridSize.h;

        let sx = 0;
        let sy = characterHeight * 2;

        if (this.direction == 'N') {
            sx = 0;
            sy = 0;
        }
        if (this.direction == 'S') {
            sx = 0;
            sy = characterHeight * 2;
        }
        if (this.direction == 'E') {
            sx = 0;
            sy = characterHeight * 3;
        }
        if (this.direction == 'W') {
            sx = 0;
            sy = characterHeight;
        }

        let swidth = characterWidth;
        let sheight = characterHeight;

        let x = this.position.x * this.map.tileset.tileSize.w - this.map.tileset.tileSize.w/2;
        let y = this.position.y * this.map.tileset.tileSize.h - this.gridSize.h/2;
        let width = swidth;
        let height = sheight;


        ctx.drawImage(this.image, sx, sy, swidth, sheight, x, y, width, height);
    }
}

module.exports = Character;