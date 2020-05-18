<template>
    <div>
        <v-container>
            <div class="row">
                <div class="col-md-5 col-sm-5 col-xs-12">
                    <v-img :src="require('../../images/' + post.image)"></v-img>
                </div>
                <div class="col-md-7 col-sm-7 col-xs-12">
                    <div class="pl-6">
                        <p class="display-1 mb-0">{{post.title}}</p>
                        <v-card-subtitle class="pa-0">
                            <p class="headline font-weight-light "> {{post.country}}</p>
                        </v-card-subtitle>
                        <v-banner>
                            <v-icon icon="calendar_today">
                                calendar_today
                            </v-icon>
                            {{post.date_posted | formatDate}}
                        </v-banner>
                        <v-banner>
                            <v-icon icon="email">
                                email
                            </v-icon>
                            {{post.email}}
                        </v-banner>
                        <v-banner>
                            <v-icon icon="phone">
                                phone
                            </v-icon>
                            {{post.phone}}
                        </v-banner>

                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-xs-12 col-md-12">
                    <v-tabs>
                        <v-tab >Description</v-tab>
                        <v-tab-item>
                            <v-textarea
                                readonly="true"
                                auto-grow="true"
                                solo
                                flat="true"
                                :value="post.description"
                            ></v-textarea>
                        </v-tab-item>
                        <v-tab v-if="post.latitude && post.longitude ">Location</v-tab>
                        <v-tab-item>
                            <p class="pt-10 subtitle-1 font-weight-thin">
                                <GmapMap
                                    :center="{lat: post.latitude, lng: post.longitude}"
                                    :zoom="17"
                                    map-type-id="terrain"
                                    style="height: 400px"
                                >
                                    <GmapMarker
                                        :position="{lat: post.latitude, lng: post.longitude}"
                                    />
                                </GmapMap>
                            </p>
                        </v-tab-item>
                    </v-tabs>

                </div>
            </div>
        </v-container>
    </div>
</template>

<script>

    export default {

        data(){
            return {
                post: [],
            }
        },
        mounted() {
            let app = this;
            let id = app.$route.params['id'];
            axios.get('/api/posts/' + id)
                .then(function (resp) {
                    app.post = resp.data;
                    console.log(app.post)
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load companies");
                });
        },

    }
</script>

<style scoped>

</style>
