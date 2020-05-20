<template>
    <div>
        <v-form @submit.prevent="sendRequest">

            <v-container>

                <v-card class="px-4">
                    <v-card-text >
                        <p class="display-1 mb-0">Update</p>
                        <v-alert v-if="hasError" type="error">
                            It seems to be an error. Please, try inputing other data
                        </v-alert>
                        <v-form ref="createAdvertisementForm" v-model="isValid" method="post">
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <ValidationProvider rules="required|max:100" v-slot="{ errors }">
                                        <v-text-field v-model="title" :rules="[rules.required]"  id='title' name="title" type="text" label="Title" :error-messages="errors[0]" required></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                                        <v-text-field :rules="[rules.required]" v-model="email"  name="email" type="text" label="E-mail" :error-messages="errors[0]" required></v-text-field>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <ValidationProvider rules="required" v-slot="{ errors }">
                                        <VuePhoneNumberInput v-model="phone" />
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <ValidationProvider rules="required|date_format:yyyy-mm-dd" v-slot="{ errors }">
                                        <v-menu
                                            v-model="fromDateMenu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            name="end_date"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    :rules="[rules.required]"
                                                    label="From"
                                                    prepend-icon="event"
                                                    readonly
                                                    :value="fromDateDisp"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                locale="en-in"
                                                v-model="fromDateVal"
                                                no-title
                                                @input="fromDateMenu = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select
                                        v-model="country"
                                        :items="countries"
                                        menu-props="auto"
                                        label="Select"
                                        prepend-icon="map"
                                        single-line
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <ValidationProvider rules="size:100" v-slot="{ errors }">
                                        <v-file-input
                                            v-model="image"
                                            accept="image/*"
                                            label="Add image (not required)"
                                            prepend-icon="mdi-camera"
                                        ></v-file-input>
                                    </ValidationProvider>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12">
                                    <ValidationProvider rules="max:500" v-slot="{ errors }">
                                        <v-textarea
                                            :autoGrow="true"
                                            v-model="description"
                                            :rules="[rules.required]"
                                            name="description"
                                            label="Description"
                                        ></v-textarea>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn block color="white" v-if="!addLocation" @click="toggleMap">
                                        <v-icon left>add_location</v-icon>Add location
                                    </v-btn>
                                    <v-btn block color="white" v-else @click="toggleMap">
                                        <v-icon left>add_location</v-icon>Don`t add location
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" v-if="addLocation">
                                    <GmapMap
                                        :center="{lat: 38.899308, lng: -77.024327}"
                                        :zoom="17"
                                        map-type-id="terrain"
                                        style="height: 400px"
                                    >
                                        <GmapMarker
                                            :draggable="true"
                                            :position="{lat: 38.899308, lng: -77.024327}"
                                            @drag="updateCoordinates"
                                        />
                                    </GmapMap>

                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                    <v-btn x-large block color="success" :disabled="!isValid" @click="sendRequest">Register</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-form>
    </div>
</template>

<script>
    import { ValidationProvider } from 'vee-validate';
    import VuePhoneNumberInput from 'vue-phone-number-input';
    import 'vue-phone-number-input/dist/vue-phone-number-input.css';
    import router from '../routes';
    export default {
        router,
        data: function(){

            return {
                hasError: false,
                country: '',
                countries: ['USA', 'Ukraine', 'Russia'],
                title: '',
                email: '',
                phone: '',
                image: '',
                prevImage: '',
                latitude: '',
                longitude: '',
                description: '',
                fromDateMenu: false,
                fromDateVal: null,
                addLocation: false,
                isValid: false,
                marker: {lat: 38.899308, lng: -77.024327},
                formData: [],
                rules: {
                    required: value => !!value || "Required.",
                }
            }
        },
        created() {
            let app = this;
            let id = app.$route.params['id'];
            axios.get('/api/posts/' + id)
                .then(function (resp) {
                    if (app.$store.getters.isLoggedIn && resp.data.user_id == app.$store.getters.getCurrentUser.id) {
                        console.log(resp.data.id)
                        app.id = resp.data.id;
                        app.country = resp.data.country;
                        app.title = resp.data.title;
                        app.email = resp.data.email;
                        app.phone = resp.data.phone;
                        if (resp.data.image){
                            app.prevImage = resp.data.image
                        }
                        app.image = resp.data.image;
                        app.fromDateVal = resp.data.end_date.slice(0, 10);
                        app.latitude = resp.data.latitude;
                        app.longitude = resp.data.longitude;
                        app.description = resp.data.description;
                        if (app.latitude && app.longitude) {
                            app.addLocation = true
                            app.marker = {lat: app.latitude, lng: app.longitude}
                        }
                    } else {
                        router.push('/')
                    }

                })
        },
        computed: {
            fromDateDisp() {
                return this.fromDateVal;
                // format/do something with date
            }

        },
        methods:{
            toggleMap() {
                this.addLocation = !this.addLocation;
                if (this.addLocation){
                    this.latitude = this.marker.lat
                    this.longitude = this.marker.lng
                }
            },
            updateCoordinates(location) {
                this.marker.lat = location.latLng.lat();
                this.marker.lng = location.latLng.lng();
            },
            sendRequest() {
                if (this.$refs.createAdvertisementForm.validate){
                    let formData = new FormData();
                    formData.append('ad_id', this.id);
                    formData.append('_method', 'patch')
                    formData.append('country', this.country);
                    formData.append('user_id', this.$store.getters.getCurrentUser.id);
                    formData.append('title', this.title);
                    formData.append('email', this.email);
                    formData.append('phone', this.phone);
                    formData.append('image', this.image);
                    formData.append('addLocation', this.addLocation);
                    formData.append('latitude', this.latitude);
                    formData.append('longitude', this.longitude);
                    formData.append('date_end', this.fromDateVal);
                    formData.append('description', this.description);
                    let url = '/api/posts/' + this.id;
                    let config = { headers: { 'Content-Type': 'multipart/form-data' } }

                    axios.post(url, formData, config).then(function(response) {
                            console.log(response.data)
                            router.push('/posts/' + response.data.id)
                        })
                        .catch(this.hasError = true);
                }
            },

        },
        components: {
            ValidationProvider,
            VuePhoneNumberInput
        }
    }
</script>

<style scoped>

</style>
