<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card class="ml-2">
                <v-img v-if="post.image"style="cursor: pointer"
                       :src="require('../../images/' + post.image)"
                    height="300px" @click="$router.push('/posts/'+post.id)"
                >
                </v-img>
                <v-img v-else src="https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg"
                       height="300px" @click="$router.push('/posts/'+post.id)"></v-img>
                <v-card-title primary-title>
                    <div>
                        <div class="headline" style="cursor: pointer" @click="$router.push('/posts/'+post.id)">{{post.title}}</div>
                        <span class="grey--text">{{post.country}}</span>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <span class="grey--text">{{post.date_posted | formatDate}}</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="show = !show">
                        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-slide-y-transition style="cursor: pointer">
                    <v-card-text v-show="show">
                        Description:
                        {{post.description | truncate(255)}}
                    </v-card-text>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "PostItem",
        props: ['post'],
        data() {
            return {
                show: false

            }
        },
    }
</script>

<style scoped>

</style>
