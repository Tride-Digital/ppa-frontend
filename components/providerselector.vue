<!-- components/providerselector.vue -->
<template>
  <v-container class="d-flex align-center" style="min-height: 100vh">
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold mb-4">
          Choose Your Registration Path
        </h2>
        <p class="text-body-1 text-grey-darken-2">
          Select the option that best describes your role in the plantation
          ecosystem
        </p>
      </v-col>

      <!-- Retainer Client Option -->
      <v-col cols="12" md="5" lg="4" class="d-flex">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 12 : 2"
            class="registration-card flex-grow-1 d-flex flex-column"
            :class="{ 'card-hover': isHovering }"
          >
            <div class="card-gradient gradient-planter">
              <v-icon size="80" color="white">mdi-leaf</v-icon>
            </div>

            <v-card-title class="text-h5 font-weight-bold text-center py-4">
              Retainer Client
            </v-card-title>

            <v-card-text class="flex-grow-1">
              <v-list density="compact" class="transparent">
                <v-list-item v-for="item in planterFeatures" :key="item">
                  <template v-slot:prepend>
                    <v-icon color="success" size="small"
                      >mdi-check-circle</v-icon
                    >
                  </template>
                  <v-list-item-title class="text-body-2">{{
                    item
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-divider class="my-4"></v-divider>

              <div class="text-center">
                <v-chip
                  color="primary"
                  variant="outlined"
                  size="small"
                  class="mb-2"
                >
                  For Plantation Owners
                </v-chip>
                <p class="text-body-2 text-grey-darken-1 mt-2">
                  Own or manage plantations producing tea, rubber, coconut, oil
                  palm, cinnamon, or spice crops
                </p>
              </div>
            </v-card-text>

            <v-card-actions class="pa-4">
              <v-btn
                block
                size="large"
                color="success"
                variant="elevated"
                @click="goToRegister"
                append-icon="mdi-arrow-right"
              >
                Register as Planter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>

      <!-- Divider Column -->
      <v-col
        cols="12"
        md="2"
        lg="1"
        class="d-none d-md-flex align-center justify-center"
      >
        <div class="or-divider">
          <v-avatar color="grey-lighten-3" size="48">
            <span class="text-grey-darken-1 font-weight-medium">OR</span>
          </v-avatar>
        </div>
      </v-col>

      <!-- Mobile Divider -->
      <v-col cols="12" class="d-md-none py-4">
        <v-divider>
          <v-chip variant="outlined" size="small">OR</v-chip>
        </v-divider>
      </v-col>

      <!-- Service Provider Option -->
      <v-col cols="12" md="5" lg="4" class="d-flex">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 12 : 2"
            class="registration-card flex-grow-1 d-flex flex-column"
            :class="{ 'card-hover': isHovering }"
          >
            <div class="card-gradient gradient-provider">
              <v-icon size="80" color="white">mdi-handshake</v-icon>
            </div>

            <v-card-title class="text-h5 font-weight-bold text-center py-4">
              Service Provider
            </v-card-title>

            <v-card-text class="flex-grow-1">
              <v-list density="compact" class="transparent">
                <v-list-item v-for="item in providerFeatures" :key="item">
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small"
                      >mdi-check-circle</v-icon
                    >
                  </template>
                  <v-list-item-title class="text-body-2">{{
                    item
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-divider class="my-4"></v-divider>

              <div class="text-center">
                <div class="mb-2">
                  <v-chip
                    color="indigo"
                    variant="outlined"
                    size="small"
                    class="ma-1"
                  >
                    Supply Chain Services
                  </v-chip>
                  <v-chip
                    color="indigo"
                    variant="outlined"
                    size="small"
                    class="ma-1"
                  >
                    Support Services
                  </v-chip>
                </div>
                <p class="text-body-2 text-grey-darken-1 mt-2">
                  Provide professional services to strengthen the plantation
                  ecosystem
                </p>
              </div>
            </v-card-text>

            <v-card-actions class="pa-4">
              <v-btn
                block
                size="large"
                color="primary"
                variant="elevated"
                @click="navigateToServiceProvider"
                append-icon="mdi-arrow-right"
              >
                Register as Service Provider
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const config = useRuntimeConfig();

// Feature lists
const planterFeatures = [
  "Connect with verified service providers",
  "Access digital plantation management tools",
  "Market your products globally",
  "Get expert consultancy services",
  "Join a community of progressive planters",
];

const providerFeatures = [
  "Reach plantation owners across Sri Lanka",
  "Build your professional network",
  "Showcase your expertise and services",
  "Get verified provider badge",
  "Grow your business digitally",
];

// Navigation functions
const goToRegister = () => {
  window.open(config.public.registerUrl, "_blank");
};

const navigateToServiceProvider = () => {
  window.open(config.public.registerServiceUrl, "_blank");
};
</script>

<style scoped>
.registration-card {
  transition: all 0.3s ease;
  border-radius: 16px !important;
  overflow: hidden;
  position: relative;
}

.card-hover {
  transform: translateY(-8px);
}

.card-gradient {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.gradient-planter {
  background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
}

.gradient-provider {
  background: linear-gradient(135deg, #2196f3 0%, #3f51b5 100%);
}

.card-gradient::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 70%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%);
  }
  100% {
    transform: translateX(100%) translateY(100%);
  }
}

.or-divider {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.or-divider::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.12) 20%,
    rgba(0, 0, 0, 0.12) 80%,
    transparent
  );
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .registration-card {
    margin-bottom: 1rem;
  }
}
</style>