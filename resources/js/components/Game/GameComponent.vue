<template>
    <div>
        <canvas id="game-screen" 
            v-bind:width="gameObjects.map.width * gameObjects.map.tileset.tileSize.w" 
            v-bind:height="gameObjects.map.height * gameObjects.map.tileset.tileSize.h">
        </canvas>
    </div>
</template>


<script>
    export default {
        props: [],
        data() {
            return {
                gameObjects: window.GAME_OBJECTS,
                gameScreen: null,
                lastRender: 0,
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
                this.gameScreen = document.getElementById('game-screen');
                window.requestAnimationFrame(this.loop);
                this.bindKeys();
            },

            bindKeys () {
                $(document).keydown((e)=>{
                    if (e.keyCode == GLOBAL.settings.upKey || e.keyCode == 38) {
                        GAME_OBJECTS.character.moveUp();
                    }
                    if (e.keyCode == GLOBAL.settings.downKey || e.keyCode == 40) {
                        GAME_OBJECTS.character.moveDown();
                    }
                    if (e.keyCode == GLOBAL.settings.rightKey || e.keyCode == 39) {
                        GAME_OBJECTS.character.moveRight();
                    }
                    if (e.keyCode == GLOBAL.settings.leftKey || e.keyCode == 37) {
                        GAME_OBJECTS.character.moveLeft();
                    }
                });
            },

            update () {

            },

            draw() {
                let ctx = this.gameScreen.getContext('2d');
                ctx.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height);
                
                window.GAME_OBJECTS.map.draw(ctx, null, 0);
                window.GAME_OBJECTS.character.draw(ctx);
                window.GAME_OBJECTS.map.draw(ctx, null, 20);
            },


            loop (timestamp) {
                var progress = timestamp - this.lastRender;

                this.update(progress);
                this.draw();

                this.lastRender = timestamp;
                window.requestAnimationFrame(this.loop)
            }
        }
    }
</script>