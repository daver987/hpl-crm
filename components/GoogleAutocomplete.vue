<script setup lang="ts">
// import { useMap } from '../stores/useMap'
// import { storeToRefs } from 'pinia'
// import { useCounterStore } from '../stores/counter'
// import { usePriceCalculator } from '../stores/usePriceCalculator'
// import { data } from '../data/useData'
// import { ref, reactive } from 'vue'
// import Alert from './MyAlert.vue'
// import { loader } from '../composables/loader'
//
// const isClosed = ref(true)
// const total = usePriceCalculator()
// const counter = useCounterStore()
// const store = useMap()
// const prefs = data()
// const onReset = () => {
//   total.$reset()
//   store.$reset()
// }
//
// const {
//   sedDistTotal,
//   suvDistTotal,
//   premSedanDistTotal,
//   premSuvDistTotal,
//   sedTimeTotal,
//   suvTimeTotal,
//   premSedanTimeTotal,
//   premSuvTimeTotal,
// } = storeToRefs(total)
//
// const vehicle = ref('sedan')
//
// const options = reactive([
//   {
//     label: 'Sedan',
//     value: 'sedan',
//     id: 1,
//     caption: 'Vehicles include Cadillac XTS or similar',
//     distanceSubTotal: sedDistTotal,
//     hourlySubTotal: sedTimeTotal,
//     gratuity: total.gratuity,
//     taxes: total.taxes,
//     kmCost: 1.7,
//     timeCost: 80,
//     minKm: 25,
//   },
//   {
//     label: 'SUV',
//     value: 'suv',
//     id: 2,
//     caption: 'Vehicles include Chevy Suburban or similar',
//     distanceSubTotal: suvDistTotal,
//     hourlySubTotal: suvTimeTotal,
//     gratuity: total.gratuity,
//     taxes: total.taxes,
//     kmCost: 2.75,
//     timeCost: 105,
//     minKm: 25,
//   },
//   {
//     label: 'Premium Sedan',
//     value: 'premium_sedan',
//     id: 3,
//     caption: 'Vehicles include Lincoln Continental or similar',
//     distanceSubTotal: premSedanDistTotal,
//     hourlySubTotal: premSedanTimeTotal,
//     gratuity: total.gratuity,
//     taxes: total.taxes,
//     kmCost: 1.85,
//     timeCost: 95,
//     minKm: 25,
//   },
//   {
//     label: 'Premium SUV',
//     value: 'premium_suv',
//     id: 4,
//     caption: 'Vehicles include Lincoln Navigator or similar',
//     distanceSubTotal: premSuvDistTotal,
//     hourlySubTotal: premSuvTimeTotal,
//     gratuity: total.gratuity,
//     taxes: total.taxes,
//     kmCost: 3,
//     timeCost: 125,
//     minKm: 25,
//   },
// ])
//
// const {
//   originInput,
//   originAutocomplete,
//   destinationAutocomplete,
//   destinationInput,
//   luggageCount,
//   passengerCount,
//   date,
//   selectedServiceType,
//   selectedOriginAddress,
//   selectedDestinationAddress,
//   place,
//   routeDistance,
//   routeDuration,
//   firstName,
//   tripNotes,
// } = storeToRefs(store)
//
// const myMap = ref<HTMLElement>(null)
//
// loader.load().then(() => {
//   const map = new google.maps.Map(myMap.value, {
//     mapTypeControl: false,
//     fullscreenControl: false,
//     zoomControl: false,
//     streetViewControl: false,
//     center: { lat: 43.65107, lng: -79.347015 },
//     zoom: 9,
//   })
//   new AutocompleteDirectionsHandler(map)
// })
//
// class AutocompleteDirectionsHandler {
//   map: unknown
//   originPlaceId: string
//   destinationPlaceId: string
//   travelMode: google.maps.TravelMode
//   directionsService: google.maps.DirectionsService
//   directionsRenderer: google.maps.DirectionsRenderer
//
//   constructor(map: google.maps.Map) {
//     this.map = map
//     this.originPlaceId = ''
//     this.destinationPlaceId = ''
//     this.travelMode = google.maps.TravelMode.DRIVING
//     this.directionsService = new google.maps.DirectionsService()
//     this.directionsRenderer = new google.maps.DirectionsRenderer()
//     this.directionsRenderer.setMap(map)
//
//     originInput.value = document.getElementById('origin-input')
//     originAutocomplete.value = new google.maps.places.Autocomplete(
//       originInput.value as HTMLInputElement
//     )
//     // Specify just the place data fields that you need.
//     originAutocomplete.value.setFields(['all'])
//     this.setupPlaceChangedListener(originAutocomplete.value, 'ORIG')
//
//     destinationInput.value = document.getElementById('destination-input')
//     destinationAutocomplete.value = new google.maps.places.Autocomplete(
//       destinationInput.value as HTMLInputElement
//     )
//     // Specify just the place data fields that you need.
//     destinationAutocomplete.value.setFields(['all'])
//     this.setupPlaceChangedListener(destinationAutocomplete.value, 'DEST')
//   }
//
//   // Sets a listener on a radio button to change the filter type on Places
//   // Autocomplete.
//   setupPlaceChangedListener(
//     autocomplete: {
//       bindTo: (arg0: string, arg1: unknown) => void
//       addListener: (arg0: string, arg1: () => void) => void
//       getPlace: () => unknown
//     },
//     mode: string
//   ) {
//     autocomplete.bindTo('bounds', this.map)
//     autocomplete.addListener('place_changed', () => {
//       place.value = autocomplete.getPlace()
//
//       if (!place.value.place_id) {
//         window.alert('Please select an option from the dropdown list.')
//         return
//       }
//
//       if (mode === 'ORIG') {
//         this.originPlaceId = place.value.place_id
//       } else {
//         this.destinationPlaceId = place.value.place_id
//       }
//       this.route()
//     })
//   }
//
//   route() {
//     if (!this.originPlaceId || !this.destinationPlaceId) {
//       return
//     }
//
//     this.directionsService.route(
//       {
//         origin: { placeId: this.originPlaceId },
//         destination: { placeId: this.destinationPlaceId },
//         travelMode: this.travelMode,
//       },
//       (response, status) => {
//         if (status === 'OK') {
//           this.directionsRenderer.setDirections(response)
//           routeDistance.value = response.routes[0].legs[0].distance.text
//           routeDuration.value = response.routes[0].legs[0].duration.text
//           selectedOriginAddress.value = response.routes[0].legs[0].start_address
//           selectedDestinationAddress.value =
//             response.routes[0].legs[0].end_address
//           // console.log(response.routes[0].legs[0].steps)
//         } else {
//           window.alert('Directions request failed due to ' + status)
//         }
//       }
//     )
//   }
// }
</script>

<template>
  <!--  <q-form-->
  <!--    class="row q-gutter-md q-pa-sm"-->
  <!--    @submit.prevent="total.priceCalculator"-->
  <!--    @reset="onReset"-->
  <!--  >-->
  <!--    <q-expansion-item-->
  <!--      group="tripDetails"-->
  <!--      icon="explore"-->
  <!--      label="Trip Details"-->
  <!--      default-opened-->
  <!--      header-class="text-black bg-grey-5"-->
  <!--      class="col"-->
  <!--      dense-toggle-->
  <!--    >-->
  <!--      <q-card bordered flat class="bg-grey-3 q-pa-sm">-->
  <!--        <q-card-section class="row q-gutter-sm">-->
  <!--          <q-select-->
  <!--            v-model="selectedServiceType"-->
  <!--            label="Service Type"-->
  <!--            :options="prefs.serviceType"-->
  <!--            outlined-->
  <!--            bg-color="white"-->
  <!--            class="col"-->
  <!--            dense-->
  <!--            hide-bottom-space-->
  <!--            options-dense-->
  <!--            transition-show="fade"-->
  <!--            transition-hide="fade"-->
  <!--          >-->
  <!--          </q-select>-->

  <!--          <q-input-->
  <!--            v-model="date"-->
  <!--            bg-color="white"-->
  <!--            class="col"-->
  <!--            outlined-->
  <!--            hide-bottom-space-->
  <!--            dense-->
  <!--          >-->
  <!--            <template #prepend>-->
  <!--              <q-icon name="event" class="cursor-pointer">-->
  <!--                <q-popup-proxy-->
  <!--                  cover-->
  <!--                  transition-show="scale"-->
  <!--                  transition-hide="scale"-->
  <!--                >-->
  <!--                  <q-date v-model="date" mask="YYYY-MM-DD HH:mm">-->
  <!--                    <div class="row items-center justify-end">-->
  <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
  <!--                    </div>-->
  <!--                  </q-date>-->
  <!--                </q-popup-proxy>-->
  <!--              </q-icon>-->
  <!--            </template>-->

  <!--            <template #append>-->
  <!--              <q-icon name="access_time" class="cursor-pointer">-->
  <!--                <q-popup-proxy-->
  <!--                  cover-->
  <!--                  transition-show="scale"-->
  <!--                  transition-hide="scale"-->
  <!--                >-->
  <!--                  <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>-->
  <!--                    <div class="row items-center justify-end">-->
  <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
  <!--                    </div>-->
  <!--                  </q-time>-->
  <!--                </q-popup-proxy>-->
  <!--              </q-icon>-->
  <!--            </template>-->
  <!--          </q-input>-->
  <!--        </q-card-section>-->

  <!--        <q-card-section class="row q-gutter-sm">-->
  <!--          <q-input-->
  <!--            id="name-input"-->
  <!--            v-model="firstName"-->
  <!--            bg-color="white"-->
  <!--            class="col"-->
  <!--            outlined-->
  <!--            label="Client Name"-->
  <!--            dense-->
  <!--            hide-bottom-space-->
  <!--            name="name-input"-->
  <!--            for="name-input"-->
  <!--          />-->
  <!--        </q-card-section>-->
  <!--        <q-card-section class="row q-gutter-sm">-->
  <!--          <label for="origin-input" class="sr-only">Pickup Address</label>-->
  <!--          <input-->
  <!--            id="origin-input"-->
  <!--            ref="origin-input"-->
  <!--            v-model="selectedOriginAddress"-->
  <!--            name="origin-input"-->
  <!--            type="text"-->
  <!--            style="width: 100%"-->
  <!--            class="q-pa-sm"-->
  <!--            autocomplete="address"-->
  <!--          />-->
  <!--        </q-card-section>-->
  <!--        <q-card-section-->
  <!--          v-show="selectedServiceType !== 'Hourly'"-->
  <!--          class="row q-gutter-sm"-->
  <!--        >-->
  <!--          <label for="destination-input" class="sr-only"-->
  <!--            >Drop-Off Address</label-->
  <!--          >-->
  <!--          <input-->
  <!--            id="destination-input"-->
  <!--            v-model="selectedDestinationAddress"-->
  <!--            name="destination-input"-->
  <!--            type="text"-->
  <!--            style="width: 100%"-->
  <!--            class="q-pa-sm"-->
  <!--            autocomplete="address"-->
  <!--          />-->
  <!--        </q-card-section>-->

  <!--        <q-card-section-->
  <!--          v-if="selectedServiceType === 'Hourly'"-->
  <!--          class="row q-gutter-sm"-->
  <!--        >-->
  <!--          <span class="mr-8">Number Of Hours</span>-->
  <!--          <q-btn-->
  <!--            round-->
  <!--            color="black"-->
  <!--            icon="remove"-->
  <!--            @click="counter.decrementHour"-->
  <!--          />-->
  <!--          <span class="text-lg p-2">{{ counter.counter }}</span>-->
  <!--          <q-btn-->
  <!--            round-->
  <!--            color="black"-->
  <!--            icon="add"-->
  <!--            @click="counter.incrementHour"-->
  <!--          />-->
  <!--        </q-card-section>-->
  <!--        <q-card-section class="row q-gutter-sm">-->
  <!--          <q-select-->
  <!--            v-model="passengerCount"-->
  <!--            label="Passenger Count"-->
  <!--            :options="prefs.selectNumbers"-->
  <!--            bg-color="white"-->
  <!--            class="col"-->
  <!--            outlined-->
  <!--            dense-->
  <!--            hide-bottom-space-->
  <!--            options-dense-->
  <!--            transition-show="fade"-->
  <!--            transition-hide="fade"-->
  <!--          />-->

  <!--          <q-select-->
  <!--            v-model="luggageCount"-->
  <!--            label="Luggage Count"-->
  <!--            :options="prefs.selectNumbers"-->
  <!--            bg-color="white"-->
  <!--            class="col"-->
  <!--            outlined-->
  <!--            dense-->
  <!--            options-dense-->
  <!--            hide-bottom-space-->
  <!--            transition-show="fade"-->
  <!--            transition-hide="fade"-->
  <!--          />-->
  <!--        </q-card-section>-->
  <!--        <q-card-section class="row q-gutter-sm">-->
  <!--          <q-input-->
  <!--            v-model="tripNotes"-->
  <!--            name="trip-notes"-->
  <!--            type="textarea"-->
  <!--            for="trip-notes"-->
  <!--            outlined-->
  <!--            bg-color="white"-->
  <!--            class="col"-->
  <!--            label="Trip Notes"-->
  <!--            dense-->
  <!--            hide-bottom-space-->
  <!--          />-->
  <!--        </q-card-section>-->
  <!--      </q-card>-->
  <!--    </q-expansion-item>-->

  <!--    &lt;!&ndash; Column Two &ndash;&gt;-->

  <!--    <q-expansion-item-->
  <!--      v-model="isClosed"-->
  <!--      group="summary"-->
  <!--      icon="event"-->
  <!--      label="Booking Summary"-->
  <!--      header-class="text-black bg-grey-5"-->
  <!--      class="col"-->
  <!--      dense-toggle-->
  <!--    >-->
  <!--      <q-card class="bg-grey-3" bordered>-->
  <!--        <q-card-section class="row q-gutter-sm">-->
  <!--          <div-->
  <!--            v-show="true"-->
  <!--            id="map"-->
  <!--            ref="myMap"-->
  <!--            style="width: 100%; height: 12.5rem"-->
  <!--          ></div>-->
  <!--        </q-card-section>-->
  <!--        <q-card-section-->
  <!--          v-if="selectedDestinationAddress"-->
  <!--          class="flex-center py-0"-->
  <!--        >-->
  <!--          <div class="w-full row">-->
  <!--            <p class="col">-->
  <!--              Service Type:-->
  <!--              <span class="text-bold">{{ selectedServiceType }}</span>-->
  <!--            </p>-->
  <!--            <p class="col">-->
  <!--              Time & Distance:-->
  <!--              <span class="text-bold"-->
  <!--                >{{ routeDuration }} / {{ routeDistance }}</span-->
  <!--              >-->
  <!--            </p>-->
  <!--          </div>-->
  <!--          <p>-->
  <!--            Pickup Location:-->
  <!--            <span class="text-bold">{{ selectedOriginAddress }}</span>-->
  <!--          </p>-->
  <!--          <p>-->
  <!--            Drop-Off Location:-->
  <!--            <span class="text-bold">{{ selectedDestinationAddress }}</span>-->
  <!--          </p>-->
  <!--        </q-card-section>-->

  <!--        <q-card-section>-->
  <!--          <template v-if="store.selectedServiceType === 'Hourly'">-->
  <!--            <q-item v-for="option in options" :key="option.id" tag="label">-->
  <!--              <q-item-section avatar>-->
  <!--                <q-radio-->
  <!--                  v-model="vehicle"-->
  <!--                  :val="option.value"-->
  <!--                  color="primary"-->
  <!--                  :name="option.value"-->
  <!--                />-->
  <!--              </q-item-section>-->
  <!--              <q-item-section>-->
  <!--                <q-item-label>{{ option.label }}</q-item-label>-->
  <!--                <q-item-label caption>{{ option.caption }}</q-item-label>-->
  <!--              </q-item-section>-->
  <!--              <q-item-section side class="text-bold"-->
  <!--                >$-->
  <!--                {{ (option.hourlySubTotal * 1.33).toFixed(2) }}</q-item-section-->
  <!--              >-->
  <!--            </q-item>-->
  <!--          </template>-->
  <!--          <template v-if="store.selectedServiceType !== 'Hourly'">-->
  <!--            <q-item v-for="option in options" :key="option.id" tag="label">-->
  <!--              <q-item-section dense avatar>-->
  <!--                <q-radio-->
  <!--                  v-model="vehicle"-->
  <!--                  :val="option.value"-->
  <!--                  color="primary"-->
  <!--                  :name="option.value"-->
  <!--                  dense-->
  <!--                />-->
  <!--              </q-item-section>-->
  <!--              <q-item-section>-->
  <!--                <q-item-label>{{ option.label }}</q-item-label>-->
  <!--                <q-item-label caption>{{ option.caption }}</q-item-label>-->
  <!--              </q-item-section>-->
  <!--              <q-item-section side class="text-bold"-->
  <!--                >$ {{ (option.distanceSubTotal * 1.33).toFixed(2)-->
  <!--                }}<q-tooltip-->
  <!--                  anchor="bottom middle"-->
  <!--                  self="top middle"-->
  <!--                  :delay="500"-->
  <!--                >-->
  <!--                  &lt;!&ndash;suppress JSUnresolvedFunction &ndash;&gt;-->
  <!--                  <span>Basefare: {{ option.distanceSubTotal.toFixed(2) }}</span-->
  <!--                  ><br />-->
  <!--                  <span-->
  <!--                    >Gratuity:-->
  <!--                    {{ (option.distanceSubTotal * 0.2).toFixed(2) }}</span-->
  <!--                  ><br />-->
  <!--                  <span-->
  <!--                    >Tax:-->
  <!--                    {{ (option.distanceSubTotal * 0.13).toFixed(2) }}</span-->
  <!--                  >-->
  <!--                </q-tooltip></q-item-section-->
  <!--              >-->
  <!--            </q-item>-->
  <!--          </template>-->
  <!--        </q-card-section>-->
  <!--        <div class="row q-pa-md q-gutter-md">-->
  <!--          <q-btn-->
  <!--            unelevated-->
  <!--            label="Get Rate"-->
  <!--            type="submit"-->
  <!--            size="md"-->
  <!--            color="primary"-->
  <!--          />-->
  <!--          <q-btn-->
  <!--            label="Reset"-->
  <!--            type="reset"-->
  <!--            size="md"-->
  <!--            color="primary"-->
  <!--            outline-->
  <!--            @click="store.$reset()"-->
  <!--          />-->
  <!--        </div>-->
  <!--      </q-card>-->
  <!--    </q-expansion-item>-->
  <!--  </q-form>-->
  <!--  <Alert message="Your Quote Has Been Saved" :my-alert="store.myAlert" />-->
</template>
