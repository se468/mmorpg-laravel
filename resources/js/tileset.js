class Tileset {
    constructor() {
        this.data = {}
        this.image = new Image();
        this.tileSize = {w: 1, h: 1}; // w,h
    }
    
    setData (data) {
        this.data = data;
        this.setImage(this.data.url);
        this.setTileSize(
            this.data.image_width / this.data.horizontal_length, 
            this.data.image_height / this.data.vertical_length
        );
    }

    setImage(src) {
        this.image.src = src;
    }

    setTileSize(w, h) {
        this.tileSize.w = w;
        this.tileSize.h = h;
    }

    draw(ctx, tile, x_canvas, y_canvas) {
        if(!tile) 
            return
        let sx = tile.x * this.tileSize.w;
        let sy = tile.y * this.tileSize.h;
        let swidth = this.tileSize.w;
        let sheight = this.tileSize.h;
        let width = swidth;
        let height = sheight;

        ctx.drawImage(
            this.image,
            sx,
            sy,
            swidth,
            sheight,
            x_canvas,
            y_canvas,
            width,
            height
        );
        /*
        ctx.beginPath()
        ctx.rect(x_canvas, y_canvas, width, height)
        ctx.stroke()
        ctx.closePath()
        */
    } 
}

module.exports = Tileset;