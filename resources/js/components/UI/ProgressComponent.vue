<template>
    <div class="progress">
        <div class="progress-bar" v-bind:class="cls"
            role="progressbar" 
            v-bind:style="{
                width: (data/ max * 100) + '%'
            }" 
            v-bind:aria-valuenow="data" 
            v-bind:aria-valuemin="min" 
            v-bind:aria-valuemax="max">
            {{ data }}
        </div>
    </div>
</template>


<script>
    export default {
        props: ["min", "max", "data", "cls"],
        data() {
            return {
                
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

            },

            store () {
                var url = "";
                axios.post(url, data)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>