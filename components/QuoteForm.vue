<script setup lang="ts">
// const username = useRuntimeConfig().FASTTRACK_USER_EMAIL
// const password = useRuntimeConfig().FASTTRACK_USER_PASSWORD

// async function fetchData() {
//   try {
//     await fastTrackApi.authenticate(username, password)
//     const companies = await fastTrackApi.fetchFastTrackApi('/companies')
//     console.log(companies)
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// }
//
// fetchData()

// import { Loader } from '@googlemaps/js-api-loader'
// import { Ref } from 'vue'
//
//
// const myMap = ref(null) as unknown as Ref<HTMLElement>
// const map = ref(null) as unknown as Ref<google.maps.Map>
// const originPlaceId = ref('')
// const destinationPlaceId = ref('')
// const travelMode = ref(google.maps.TravelMode.DRIVING)
// const directionsService = ref(new google.maps.DirectionsService())
// const directionsRenderer = ref(new google.maps.DirectionsRenderer())
//
//
//
// const initMap = async () => {
//   const loader = new Loader({
//     apiKey: useRuntimeConfig().public.GOOGLE_MAPS_API_KEY,
//     version: "weekly",
//     libraries: ["places"]
//   });
//   await loader.load().then(() => {
//     map.value = new google.maps.Map(myMap.value, {
//       mapTypeControl: false,
//       fullscreenControl: false,
//       zoomControl: false,
//       streetViewControl: false,
//       center: { lat: 43.65107, lng: -79.347015 },
//       zoom: 9,
//     });
//   });
// }
//
// onMounted(async () => {
//   await initMap()
//   directionsRenderer.value.setMap(map.value)
//
//   const originInput = document.getElementById('origin-input')
//   const originAutocomplete = new google.maps.places.Autocomplete(originInput as HTMLInputElement)
//   originAutocomplete.setFields(['all'])
//   originAutocomplete.bindTo('bounds', map.value)
//   originAutocomplete.addListener('place_changed', () => {
//     const place = originAutocomplete.getPlace()
//     if (!place.place_id) {
//       window.alert('Please select an option from the dropdown list.')
//       return
//     }
//     originPlaceId.value = place.place_id
//     route()
//   })
//
//   const destinationInput = document.getElementById('destination-input')
//   const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput as HTMLInputElement)
//   destinationAutocomplete.setFields(['all'])
//   destinationAutocomplete.bindTo('bounds', map.value)
//   destinationAutocomplete.addListener('place_changed', () => {
//     const place = destinationAutocomplete.getPlace()
//     if (!place.place_id) {
//       window.alert('Please select an option from the dropdown list.')
//       return
//     }
//     destinationPlaceId.value = place.place_id
//     route()
//   })
// })
//
// function route() {
//   if (!originPlaceId.value || !destinationPlaceId.value) {
//     return
//   }
//   directionsService.value.route(
//     {
//       origin: { placeId: originPlaceId.value },
//       destination: { placeId: destinationPlaceId.value },
//       travelMode: travelMode.value,
//     },
//     (response, status) => {
//       if (status === 'OK') {
//         directionsRenderer.value.setDirections(response)
//         console.log(response?.routes)
//       } else {
//         window.alert('Directions request failed due to ' + status)
//       }
//     }
//   )
// }
// const date = ref()
// const selectedOriginAddress = ref('')
// const selectedDestinationAddress = ref('')
// const selectedServiceType = ref('')
// const firstName = ref('')
// const lastName = ref('')
// const email = ref('')
// const phone = ref('')
// const passengerCount = ref('')
// const luggageCount = ref('')
</script>

<template>
  <!--  <div class="row py-2 q-px-md justify-between items-center">-->
  <!--    <div>-->
  <!--      <span class="text-bold">Quote Number # </span-->
  <!--      >-->
  <!--    </div>-->
  <!--    <q-btn-->
  <!--      label="New Rate"-->
  <!--      type="reset"-->
  <!--      size="md"-->
  <!--      color="primary"-->
  <!--      flat-->
  <!--    />-->
  <!--  </div>-->
  <!--  <q-form-->
  <!--    class="row q-gutter-md q-pa-md"-->
  <!--  >-->
  <!--    <q-card class="bg-white col" flat>-->
  <!--      <q-list class="bg-white space-y-2">-->
  <!--        <q-expansion-item-->
  <!--          group="tripDetails"-->
  <!--          icon="explore"-->
  <!--          label="Trip Details"-->
  <!--          default-opened-->
  <!--          header-class="text-black bg-grey-5"-->
  <!--        >-->
  <!--          <q-card bordered flat class="bg-grey-3 q-pa-sm">-->
  <!--            <q-card-section-->
  <!--              ><span class="text-bold text-lg"-->
  <!--                >Trip Details</span-->
  <!--              ></q-card-section-->
  <!--            >-->
  <!--            <q-card-section class="row q-gutter-sm">-->

  <!--              <q-input-->
  <!--                v-model="date"-->
  <!--                bg-color="white"-->
  <!--                class="col"-->
  <!--                outlined-->
  <!--                dense-->
  <!--              >-->
  <!--                <template #prepend>-->
  <!--                  <q-icon name="event" class="cursor-pointer">-->
  <!--                    <q-popup-proxy-->
  <!--                      cover-->
  <!--                      transition-show="scale"-->
  <!--                      transition-hide="scale"-->
  <!--                    >-->
  <!--                      <q-date v-model="date" mask="YYYY-MM-DD HH:mm">-->
  <!--                        <div class="row items-center justify-end">-->
  <!--                          <q-btn-->
  <!--                            v-close-popup-->
  <!--                            label="Close"-->
  <!--                            color="primary"-->
  <!--                            flat-->
  <!--                          />-->
  <!--                        </div>-->
  <!--                      </q-date>-->
  <!--                    </q-popup-proxy>-->
  <!--                  </q-icon>-->
  <!--                </template>-->

  <!--                <template #append>-->
  <!--                  <q-icon name="access_time" class="cursor-pointer">-->
  <!--                    <q-popup-proxy-->
  <!--                      cover-->
  <!--                      transition-show="scale"-->
  <!--                      transition-hide="scale"-->
  <!--                    >-->
  <!--                      <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>-->
  <!--                        <div class="row items-center justify-end">-->
  <!--                          <q-btn-->
  <!--                            v-close-popup-->
  <!--                            label="Close"-->
  <!--                            color="primary"-->
  <!--                            flat-->
  <!--                          />-->
  <!--                        </div>-->
  <!--                      </q-time>-->
  <!--                    </q-popup-proxy>-->
  <!--                  </q-icon>-->
  <!--                </template>-->
  <!--              </q-input>-->
  <!--            </q-card-section>-->
  <!--            <q-card-section>-->
  <!--              <q-input-->
  <!--                v-model="selectedOriginAddress"-->
  <!--                name="origin-input"-->
  <!--                type="text"-->
  <!--                for="origin-input"-->
  <!--                outlined-->
  <!--                bg-color="white"-->
  <!--                class="col"-->
  <!--                label="Pickup Address"-->
  <!--                hint="Enter in the name or address of the pickup location"-->
  <!--                dense-->
  <!--              />-->
  <!--            </q-card-section>-->
  <!--            <q-card-section v-if="selectedServiceType !== 'Hourly'">-->
  <!--              <q-input-->
  <!--                v-model="selectedDestinationAddress"-->
  <!--                name="destination-input"-->
  <!--                type="text"-->
  <!--                for="destination-input"-->
  <!--                outlined-->
  <!--                bg-color="white"-->
  <!--                class="col"-->
  <!--                label="Drop-Off Address"-->
  <!--                hint="Enter in the name or address of the drop-off location"-->
  <!--                dense-->
  <!--              />-->
  <!--            </q-card-section>-->
  <!--            <q-card-section v-if="selectedServiceType === 'Hourly'">-->
  <!--              <span class="mr-8">Number Of Hours</span>-->
  <!--              <q-btn-->
  <!--                round-->
  <!--                color="black"-->
  <!--                icon="remove"-->
  <!--              />-->
  <!--              <span class="text-lg p-2">2</span>-->
  <!--              <q-btn-->
  <!--                round-->
  <!--                color="black"-->
  <!--                icon="add"-->

  <!--              />-->
  <!--            </q-card-section>-->
  <!--          </q-card>-->
  <!--        </q-expansion-item>-->

  <!--        <q-expansion-item-->
  <!--          group="tripDetails"-->
  <!--          icon="perm_identity"-->
  <!--          label="Contact Information"-->
  <!--          header-class="text-black bg-grey-5"-->
  <!--        >-->
  <!--          <q-card flat bordered class="bg-grey-3 q-pa-sm">-->
  <!--            <q-card-section-->
  <!--              ><span class="text-bold text-lg"-->
  <!--                >Passenger Information</span-->
  <!--              ></q-card-section-->
  <!--            >-->
  <!--            <q-card-section class="row q-gutter-md">-->
  <!--              <q-input-->
  <!--                v-model="firstName"-->
  <!--                bg-color="white"-->
  <!--                class="col"-->
  <!--                outlined-->
  <!--                label="First Name"-->
  <!--                dense-->
  <!--              />-->
  <!--              <q-input-->
  <!--                v-model="lastName"-->
  <!--                bg-color="white"-->
  <!--                class="col"-->
  <!--                outlined-->
  <!--                label="Last Name"-->
  <!--                dense-->
  <!--              />-->
  <!--            </q-card-section>-->
  <!--            <q-card-section class="row q-gutter-md">-->
  <!--              <q-input-->
  <!--                v-model="email"-->
  <!--                bg-color="white"-->
  <!--                class="col"-->
  <!--                outlined-->
  <!--                label="Email"-->
  <!--                type="email"-->
  <!--                dense-->
  <!--              />-->
  <!--              <q-input-->
  <!--                v-model="phone"-->
  <!--                bg-color="white"-->
  <!--                class="col"-->
  <!--                outlined-->
  <!--                label="Phone Number"-->
  <!--                type="tel"-->
  <!--                dense-->
  <!--                mask="(###) ### - ####"-->
  <!--                fill-mask-->
  <!--              />-->
  <!--            </q-card-section>-->
  <!--          </q-card>-->
  <!--        </q-expansion-item>-->

  <!--        <q-expansion-item-->
  <!--          group="tripDetails"-->
  <!--          icon="more"-->
  <!--          label="Additional Information"-->
  <!--          header-class="text-black bg-grey-5"-->
  <!--        >-->
  <!--          <q-card flat bordered class="bg-grey-3 q-pa-sm">-->
  <!--            <q-card-section-->
  <!--              ><span class="text-bold text-lg"-->
  <!--                >Additional Information</span-->
  <!--              ></q-card-section-->
  <!--            >-->
  <!--            <q-card-section>-->
  <!--              <div class="row q-gutter-sm">-->
  <!--                <q-select-->
  <!--                  v-model="passengerCount"-->
  <!--                  label="Passenger Count"-->
  <!--                  bg-color="white"-->
  <!--                  class="col"-->
  <!--                  outlined-->
  <!--                  dense-->
  <!--                />-->

  <!--                <q-select-->
  <!--                  v-model="luggageCount"-->
  <!--                  label="Luggage Count"-->
  <!--                  bg-color="white"-->
  <!--                  class="col"-->
  <!--                  outlined-->
  <!--                  dense-->
  <!--                />-->
  <!--              </div>-->
  <!--            </q-card-section>-->
  <!--            <q-card-section>-->
  <!--              <q-btn-->
  <!--                size="md"-->
  <!--                color="primary"-->
  <!--                label="Save Booking"-->

  <!--              />-->
  <!--            </q-card-section>-->
  <!--          </q-card>-->
  <!--        </q-expansion-item>-->
  <!--      </q-list>-->
  <!--    </q-card>-->

  <!--    &lt;!&ndash; Column Two &ndash;&gt;-->
  <!--    <q-card class="bg-white col" flat>-->
  <!--      <q-list class="bg-white space-y-2">-->
  <!--        <q-expansion-item-->

  <!--          group="summary"-->
  <!--          icon="event"-->
  <!--          label="Booking Summary"-->
  <!--          header-class="text-black bg-grey-5"-->
  <!--        >-->
  <!--          <q-card class="bg-grey-3" bordered>-->
  <!--            <q-card-section>-->
  <!--              <div v-show="true" id="map" ref="myMap" class="h-64 w-full"></div>-->
  <!--            </q-card-section>-->
  <!--            <q-card-section v-if="selectedDestinationAddress">-->
  <!--              <div class="row">-->
  <!--                <p class="col">-->
  <!--                  Service Type:-->
  <!--                  <span class="text-bold">{{ selectedServiceType }}</span>-->
  <!--                </p>-->
  <!--                <p class="col">-->
  <!--                  Time & Distance:-->
  <!--                  <span class="text-bold"-->
  <!--                    >Distance </span-->
  <!--                  >-->
  <!--                </p>-->
  <!--              </div>-->
  <!--              <p>-->
  <!--                Pickup Location:-->
  <!--                <span class="text-bold">{{ selectedOriginAddress }}</span>-->
  <!--              </p>-->
  <!--              <p>-->
  <!--                Drop-Off Location:-->
  <!--                <span class="text-bold">{{ selectedDestinationAddress }}</span>-->
  <!--              </p>-->
  <!--            </q-card-section>-->
  <!--          </q-card>-->
  <!--        </q-expansion-item>-->
  <!--        <q-expansion-item-->
  <!--          group="summary"-->
  <!--          icon="paid"-->
  <!--          label="Cost Summary"-->
  <!--          header-class="text-black bg-grey-5"-->
  <!--        >-->
  <!--          <q-card class="bg-grey-3 col" bordered>-->
  <!--            <q-card-section>-->
  <!--              <q-list>-->
  <!--              -->
  <!--              </q-list>-->
  <!--            </q-card-section>-->
  <!--          </q-card>-->
  <!--        </q-expansion-item>-->
  <!--      </q-list>-->
  <!--    </q-card>-->
  <!--  </q-form>-->
</template>
