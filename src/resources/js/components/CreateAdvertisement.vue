<template>
    <div>
        <v-form @submit.prevent="sendRequest">

        <v-container>

        <v-card class="px-4">
                <v-card-text >
                    <p class="display-1 mb-0">Create Advertisement</p>

                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <ValidationProvider rules="required|max:100" v-slot="{ errors }">
                                    <v-text-field v-model="title" id='title' name="title" type="text" label="Title" :error-messages="errors[0]" required></v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <ValidationProvider rules="required|email" v-slot="{ errors }">
                                    <v-text-field v-model="email"  name="email" type="text" label="E-mail" :error-messages="errors[0]" required></v-text-field>
                                </ValidationProvider>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <ValidationProvider rules="required|phone" v-slot="{ errors }">
                                    <VuePhoneNumberInput v-model="phone" />
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <ValidationProvider rules="required|date_format:yyyy-mm-dd" v-slot="{ errors }">
                                    <v-menu

                                        v-model="fromDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
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
                                    v-model="e1"
                                    :items="countries"
                                    menu-props="auto"
                                    label="Select"
                                    hide-details
                                    prepend-icon="map"
                                    single-line
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <ValidationProvider rules="image|size:100" v-slot="{ errors }">
                                    <v-file-input
                                        label="Add image (not required)"
                                        prepend-icon="mdi-camera"
                                    ></v-file-input>
                                </ValidationProvider>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12">
                                <ValidationProvider rules="required|max:500" v-slot="{ errors }">
                                    <v-textarea
                                        name="input-7-1"
                                        label="Description"
                                        hint="Hint text"
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
                                <v-btn x-large block color="success" type="submit"">Register</v-btn>
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
    export default {
        data: function() {
            return {
                e1: 'USA',
                countries: ['USA', 'Ukraine', 'Russia'],
                title: '',
                email: '',
                phone: '',
                date_end: '',
                latitude: null,
                longitude: null,
                fromDateMenu: false,
                fromDateVal: null,
                addLocation: false,
                isValid: false,
                formData: []
            }
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
            },
            updateCoordinates(location) {
                this.latitude = location.latLng.lat();
                this.longitude = location.latLng.lng();
            },
            sendRequest(submitEvent) {
                this.name = submitEvent.target.elements.name.value
            }
        },
        components: {
            ValidationProvider,
            VuePhoneNumberInput
        }
    }
</script>

<style scoped>

</style>
