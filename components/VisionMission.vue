<template>
  <v-container class="my-12">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="4" class="pa-6 rounded-xl">
          <v-tabs
            v-model="tab"
            align-tabs="center"
            color="green-darken-2"
            slider-color="green-accent-3"
            grow
          >
            <v-tab value="vision">
              <v-icon start>mdi-eye</v-icon>
              Vision
            </v-tab>
            <v-tab value="mission">
              <v-icon start>mdi-rocket-launch</v-icon>
              Mission
            </v-tab>
          </v-tabs>

          <v-window v-model="tab" class="mt-6" touch>
            <v-window-item value="vision">
              <v-slide-y-transition>
                <div>
                  <h2 class="text-h5 font-weight-bold mb-3">Vision</h2>
                  <p class="text-subtitle-1 font-italic mb-4">
                    To be sustainable and internationally competitive
                  </p>
                  <p>
                    PPA Pvt Ltd aims to position itself as a globally recognized and environmentally
                    responsible leader in the proprietary plantation sector, ensuring long-term viability
                    and excellence in overall business performance.
                  </p>
                </div>
              </v-slide-y-transition>
            </v-window-item>

            <v-window-item value="mission">
              <v-slide-y-transition>
                <div>
                  <h2 class="text-h5 font-weight-bold mb-3">Mission</h2>
                  <p class="text-subtitle-1 font-italic mb-4">
                    Transform the proprietary plantation sector with innovation
                  </p>
                  <p>
                    PPA Pvt Ltd transforms the proprietary plantation sector through innovation, advanced
                    technologies, and value chain optimization. We modernize operations, boost productivity,
                    and create higher value for stakeholders while promoting biodiversity, climate resilience,
                    and green livelihoods. By continuously improving all production factors, PPA enables
                    planters to achieve cost leadership, sustainable competitive advantage, and measurable
                    economic, environmental, and social impact across Sri Lanka’s proprietary plantations.
                  </p>
                </div>
              </v-slide-y-transition>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('vision')
</script>

<style scoped>
p {
  line-height: 1.6;
}
</style>
