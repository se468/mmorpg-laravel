<template>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <div class="col-md-9 flex-center" style="background: black;">
                <canvas id="game-screen" 
                    v-bind:width="gameObjects.map.width * gameObjects.map.tileset.tileSize.w" 
                    v-bind:height="gameObjects.map.height * gameObjects.map.tileset.tileSize.h">
                </canvas>
            </div>
            <div class="col-md-3">
                <div class="font-weight-bold text-center mt-2 mb-2">
                   맵:  {{ gameObjects.map.name }} | (x: {{ gameObjects.hero.position.x }}, y: {{ gameObjects.hero.position.y }})
                </div>
                <div class="font-weight-bold text-center mt-2 mb-2">
                   {{ user.name }}
                </div>
                <div class="mb-2">
                    <div class="row">   
                        <div class="col-1">
                            HP
                        </div>
                        <div class="col-11">
                            <progress-component 
                                :cls="'bg-danger'"
                                :min="0" 
                                :max="10"
                                :data="gameObjects.hero.hp">
                            </progress-component>
                        </div>
                    </div>
                </div>
                <div class="mb-2">
                    <div class="row">   
                        <div class="col-1">
                            SP
                        </div>
                        <div class="col-11">
                            <progress-component 
                                :cls="'bg-primary'"
                                :min="0" 
                                :max="10"
                                :data="gameObjects.hero.sp">
                            </progress-component>
                        </div>
                    </div>
                </div>
                {{ gameObjects.hero.target }}
                <div class="mb-2" v-if="gameObjects.hero.target">
                    <progress-component 
                        :cls="'bg-danger'"
                        :min="0" 
                        :max="10"
                        :data="gameObjects.hero.target.hp">
                    </progress-component>
                </div>
                <div class="mb-2">
                    장비
                </div>
                <div class="mb-2">
                    가방
                </div>
            </div>
        </div>
        <!--
        <audio autoplay id="x-mas-audio">
            <source src="/music/PerituneMaterial_Hanagoyomi.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        -->
    </div>
</template>


<script>
    export default {
        props: ["user"],
        data() {
            return {
                gameObjects: window.GAME_OBJECTS,
                gameScreen: null,
                lastRender: 0,
                display: null
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
                this.gameScreen = document.getElementById('game-screen')
                this.display = new Display(this.gameScreen)
                window.requestAnimationFrame(this.loop)
                this.bindKeys()
            },

            bindKeys () {
                $(document).keydown((e)=>{
                    if (e.keyCode == GLOBAL.settings.upKey || e.keyCode == 38) {
                        GAME_OBJECTS.hero.move('N')
                    }
                    if (e.keyCode == GLOBAL.settings.downKey || e.keyCode == 40) {
                        GAME_OBJECTS.hero.move('S')
                    }
                    if (e.keyCode == GLOBAL.settings.rightKey || e.keyCode == 39) {
                        GAME_OBJECTS.hero.move('E')
                    }
                    if (e.keyCode == GLOBAL.settings.leftKey || e.keyCode == 37) {
                        GAME_OBJECTS.hero.move('W')
                    }
                    if(e.keyCode == GLOBAL.settings.actionKey) {
                        GAME_OBJECTS.hero.attack()
                    }
                });
            },

            update () {
                window.GAME_OBJECTS.hero.update()

                for(let key in window.GAME_OBJECTS.monsters) {
                    window.GAME_OBJECTS.monsters[key].update()
                }
            },


            loop (timestamp) {
                var progress = timestamp - this.lastRender

                this.update(progress)
                this.display.draw()

                this.lastRender = timestamp
                window.requestAnimationFrame(this.loop)
            }
        }
    }
</script>