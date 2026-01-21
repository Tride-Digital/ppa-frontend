<!-- components/providerselector.vue -->
<template>
  <v-container class="d-flex align-center" style="min-height: 100vh">
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 text-sm-h4 text-xs-h5 font-weight-bold mb-4 px-4">
          Choose Your Registration Path
        </h2>
        <p class="text-body-1 text-sm-body-1 text-xs-body-2 text-grey-darken-2 px-4">
          Select the option that best describes your role in the plantation
          ecosystem
        </p>
        <div ref="cardsStartTarget" style="height: 1px;"></div>
      </v-col>

      <!-- Retainer Client Option -->
      <v-col cols="12" md="5" lg="4" class="d-flex">
        <div ref="cardsStartTarget" style="height: 1px;"></div>
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 12 : 2"
            class="registration-card flex-grow-1 d-flex flex-column"
            :class="{ 'card-hover': isHovering }"
          >
            <div class="card-gradient gradient-planter">
              <v-icon size="80" class="icon-responsive" color="white">mdi-leaf</v-icon>
            </div>

            <v-card-title class="text-h5 text-sm-h5 text-xs-h6 font-weight-bold text-center py-4 px-2">
              Retainer Client
            </v-card-title>

            <v-card-text class="flex-grow-1 px-4 px-sm-5 px-md-6">
              <v-list density="compact" class="transparent">
                <v-list-item v-for="item in planterFeatures" :key="item" class="px-0 mb-1">
                  <template v-slot:prepend>
                    <v-icon color="success" size="small" class="mr-2 flex-shrink-0"
                      >mdi-check-circle</v-icon
                    >
                  </template>
                  <v-list-item-title class="text-body-2 text-sm-body-2 text-xs-caption text-wrap">{{
                    item
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-divider class="my-4"></v-divider>

              <div class="text-center px-2">
                <v-chip
                  color="primary"
                  variant="outlined"
                  size="small"
                  class="mb-2 chip-responsive"
                >
                  For Plantation Owners
                </v-chip>
                <p class="text-body-2 text-sm-body-2 text-xs-caption text-grey-darken-1 mt-2 px-2">
                  Own or manage plantations producing tea, rubber, coconut, oil
                  palm, cinnamon, or spice crops
                </p>
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pa-sm-5 pa-md-6">
              <v-btn
                block
                size="large"
                color="success"
                variant="elevated"
                @click="goToRegister"
                append-icon="mdi-arrow-right"
                class="btn-responsive text-none"
              >
                <span class="btn-text">Register as a Retainer client</span>
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
              <v-icon size="80" class="icon-responsive" color="white">mdi-handshake</v-icon>
            </div>

            <v-card-title class="text-h5 text-sm-h5 text-xs-h6 font-weight-bold text-center py-4 px-2">
              Service Provider
            </v-card-title>

            <v-card-text class="flex-grow-1 px-4 px-sm-5 px-md-6">
              <v-list density="compact" class="transparent">
                <v-list-item v-for="item in providerFeatures" :key="item" class="px-0 mb-1">
                  <template v-slot:prepend>
                    <v-icon color="primary" size="small" class="mr-2 flex-shrink-0"
                      >mdi-check-circle</v-icon
                    >
                  </template>
                  <v-list-item-title class="text-body-2 text-sm-body-2 text-xs-caption text-wrap">{{
                    item
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-divider class="my-4"></v-divider>

              <div class="text-center px-2">
                <div class="mb-2 d-flex flex-wrap justify-center gap-1">
                  <v-chip
                    color="indigo"
                    variant="outlined"
                    size="small"
                    class="ma-1 chip-responsive"
                  >
                    Supply Chain Services
                  </v-chip>
                  <v-chip
                    color="indigo"
                    variant="outlined"
                    size="small"
                    class="ma-1 chip-responsive"
                  >
                    Support Services
                  </v-chip>
                </div>
                <p class="text-body-2 text-sm-body-2 text-xs-caption text-grey-darken-1 mt-2 px-2">
                  Provide professional services to strengthen the plantation
                  ecosystem
                </p>
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pa-sm-5 pa-md-6">
              <v-btn
                block
                size="large"
                color="primary"
                variant="elevated"
                @click="navigateToServiceProvider"
                append-icon="mdi-arrow-right"
                class="btn-responsive text-none"
              >
                <span class="btn-text">Register as a PPA Service Provider</span>
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
import { ref, onMounted, nextTick } from "vue";
import { useRuntimeConfig } from "#app";

const router = useRouter();
const config = useRuntimeConfig();

const cardsStartTarget = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();

  setTimeout(() => {
    const el = cardsStartTarget.value;
    if (!el) return;

    const offset = 110;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, 50);
});

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

.text-wrap {
  white-space: normal !important;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.4;
}

.btn-responsive {
  height: auto !important;
  min-height: 48px;
  padding: 12px 16px !important;
}

.btn-text {
  white-space: normal;
  line-height: 1.3;
  text-align: center;
  display: inline-block;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .registration-card {
    margin-bottom: 1rem;
  }
}

@media (max-width: 600px) {
  .card-gradient {
    height: 140px;
  }
  
  .icon-responsive {
    font-size: 60px !important;
  }
  
  .btn-responsive {
    font-size: 0.875rem !important;
    padding: 10px 12px !important;
  }
  
  .chip-responsive {
    font-size: 0.75rem !important;
  }
}

@media (max-width: 400px) {
  .card-gradient {
    height: 120px;
  }
  
  .icon-responsive {
    font-size: 50px !important;
  }
  
  .btn-responsive {
    font-size: 0.8125rem !important;
    padding: 8px 10px !important;
  }
}
</style>
