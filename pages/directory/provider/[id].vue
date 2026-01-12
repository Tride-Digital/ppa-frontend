<template>
  <div class="single-provider-page">
    <section v-if="loadingDetail" class="hero-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate size="50" />
            <p class="mt-4">Loading provider details...</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section v-else-if="provider" class="hero-section">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-chip color="primary" variant="tonal" class="mb-3">
              <v-icon start size="small">mdi-account-tie</v-icon>
              Approved Provider
            </v-chip>

            <h1 class="hero-title">{{ provider.business_name }}</h1>
            <p class="hero-description">
              {{ provider.description || "Professional service provider in Sri Lanka." }}
            </p>

            <div class="mt-4 d-flex flex-wrap gap-2">
              <v-chip v-if="provider.is_featured" color="primary" variant="elevated" size="small">
                <v-icon start size="small">mdi-star</v-icon> Featured
              </v-chip>
              <v-chip v-if="provider.has_certifications" color="success" variant="elevated" size="small">
                <v-icon start size="small">mdi-certificate</v-icon> Verified
              </v-chip>
              <v-chip v-if="provider.average_rating" color="warning" variant="tonal" size="small">
                <v-icon start size="small">mdi-star</v-icon>
                {{ provider.average_rating }} ({{ provider.rating_count || 0 }})
              </v-chip>
            </div>
            <div class="mt-6">
              <v-btn variant="outlined" color="primary" class="hero-back-btn" @click="goBack">
                <v-icon start>mdi-arrow-left</v-icon>
                Back to Directory
              </v-btn>
            </div>
          </v-col>

          <!-- <v-col cols="12" md="6">
            <v-img
              :src="provider.image_url || fallbackImage"
              height="420"
              cover
              class="rounded-lg elevation-8"
            />
          </v-col> -->
        </v-row>
      </v-container>
    </section>

    <section v-if="provider" class="details-section py-10">
      <v-container>
        <v-row>
          <v-col cols="12" lg="8">
            <h2 class="section-title mb-5">Services Offered</h2>

            <div class="mb-6">
              <v-chip
                v-for="(s, i) in provider.services"
                :key="i"
                size="small"
                variant="tonal"
                color="primary"
                class="me-2 mb-2"
              >
                {{ s.subcategory || s.service_category }}
              </v-chip>
            </div>

            <h3 class="subsection-title mb-3">Coverage</h3>
            <div class="mb-6">
              <div v-if="provider.geographical_coverage && provider.geographical_coverage.length > 0">
                <v-chip
                  v-for="(coverage, idx) in provider.geographical_coverage"
                  :key="idx"
                  size="small"
                  variant="outlined"
                  class="me-2 mb-2"
                >
                  <v-icon start size="small">mdi-map-marker</v-icon>
                  {{ coverage.province }}
                  <span v-if="coverage.districts && coverage.districts.length > 0">
                    • {{ coverage.districts.map(getDistrictName).join(", ") }}
                  </span>
                </v-chip>
              </div>
              <div v-else>
                <v-chip size="small" variant="outlined" class="me-2 mb-2">
                  <v-icon start size="small">mdi-map-marker</v-icon>
                  {{ provider.province_name || provider.province_code }} •
                  {{ provider.district_name || provider.district_code }}
                </v-chip>
              </div>
            </div>

            <h3 class="subsection-title mb-3">About</h3>
            <p class="text-body-1" style="color: rgb(var(--v-theme-on-surface)); line-height: 1.8;">
              {{ provider.description || "No additional description available." }}
            </p>

            <div v-if="qualifications.length" class="mt-8">
              <h3 class="subsection-title mb-3">Qualifications</h3>

              <v-card class="info-card" elevation="0" variant="tonal">
                <v-list density="compact">
                  <v-list-item v-for="(q, i) in qualifications" :key="i">
                    <template #prepend>
                      <v-icon color="primary">mdi-school</v-icon>
                    </template>

                    <v-list-item-title class="font-weight-bold">
                      {{ q.qualification || q.title || "Qualification" }}
                    </v-list-item-title>

                    <v-list-item-subtitle v-if="q.yearsOfExperience || q.institute || q.year">
                      <span v-if="q.yearsOfExperience">{{ q.yearsOfExperience }}</span>
                      <span v-if="q.institute"> • {{ q.institute }}</span>
                      <span v-if="q.year"> • {{ q.year }}</span>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </div>

            <div v-if="clients.length" class="mt-8">
              <h3 class="subsection-title mb-3">Clients</h3>

              <v-card class="info-card" elevation="0" variant="tonal">
                <v-list density="compact">
                  <v-list-item v-for="(c, i) in clients" :key="i">
                    <template #prepend>
                      <v-icon color="primary">mdi-account-group</v-icon>
                    </template>

                    <v-list-item-title class="font-weight-bold">
                      {{ c.clientName || c.client_name || c.name || "Client" }}
                    </v-list-item-title>

                    <v-list-item-subtitle v-if="c.project || c.description">
                      <span v-if="c.project">{{ c.project }}</span>
                      <span v-else-if="c.description">{{ c.description }}</span>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </div>
          </v-col>

          <v-col cols="12" lg="4">
            <!-- Contact -->
            <v-card class="info-card" elevation="4">
              <v-card-title class="bg-section-title text-on-primary">
                <v-icon start>mdi-information-outline</v-icon>
                Contact
              </v-card-title>

              <v-card-text class="pt-4">
                <div class="mb-3" v-if="provider.owner_name">
                  <div class="label">Owner</div>
                  <div class="value">{{ provider.owner_name }}</div>
                </div>

                <div class="mb-3" v-if="provider.phone">
                  <div class="label">Phone</div>
                  <div class="value">{{ provider.phone }}</div>
                </div>

                <div class="mb-3" v-if="provider.email">
                  <div class="label">Email</div>
                  <div class="value">{{ provider.email }}</div>
                </div>

                <div class="mb-3" v-if="provider.website">
                  <div class="label">Website</div>
                  <div class="value">
                    <a :href="provider.website" target="_blank" rel="noreferrer">{{ provider.website }}</a>
                  </div>
                </div>

                <v-divider class="my-4" />

                <!-- Request a Quote button ONLY inside contact card -->
                <v-btn color="primary" block @click="quoteDialog = true">
                  <v-icon start>mdi-email-fast</v-icon>
                  Request a Quote
                </v-btn>
              </v-card-text>
            </v-card>

            <v-card v-if="provider.documents?.length" class="info-card mt-6" elevation="4">
              <v-card-title class="bg-section-title text-on-primary">
                <v-icon start>mdi-file-document</v-icon>
                Documents
              </v-card-title>
              <v-card-text class="pt-4">
                <v-list density="compact">
                  <v-list-item v-for="(d, i) in provider.documents" :key="i" :href="d.document_url" target="_blank">
                    <template #prepend>
                      <v-icon>mdi-link</v-icon>
                    </template>
                    <v-list-item-title>{{ d.document_type }}</v-list-item-title>
                    <v-list-item-subtitle>Open</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-row v-if="!provider && !loadingDetail">
      <v-col cols="12" class="text-center py-10">
        <v-icon size="90" color="grey">mdi-account-off</v-icon>
        <h2 class="mt-4">Provider Not Found</h2>
        <v-btn color="primary" class="mt-4" @click="goBack">Back</v-btn>
      </v-col>
    </v-row>

    <!-- Popup Quote Form -->
    <RequestQuoteDialog
      v-if="provider?.id"
      v-model="quoteDialog"
      :provider-id="provider.id"
      :provider-name="provider.business_name"
      @submitted="onQuoteSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePublicDirectory } from "~/composables/usePublicDirectory";
import { useLocations } from "~/composables/useLocations";
import RequestQuoteDialog from "~/components/directory/RequestQuoteDialog.vue";

const route = useRoute();
const { fetchProviderDetail, loadingDetail } = usePublicDirectory();
const { districts, fetchAllDistricts } = useLocations();

const provider = ref<any>(null);
const quoteDialog = ref(false);

// const fallbackImage =
//   "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=60";

// Helper function to get district name from code
const getDistrictName = (code: string): string => {
  const district = districts.value.find((d: any) => d.district_code === code);
  return district?.district_en || code;
};

type QualificationItem = {
  qualification?: string;
  title?: string;
  yearsOfExperience?: string;
  institute?: string;
  year?: string;
};

type ClientItem = {
  clientName?: string;
  client_name?: string;
  name?: string;
  project?: string;
  description?: string;
};

// Handles: array | JSON-string | object | null
function normalizeToArray<T = any>(val: any): T[] {
  if (!val) return [];

  if (Array.isArray(val)) return val as T[];

  if (typeof val === "string") {
    const s = val.trim();
    if (!s) return [];
    try {
      const parsed = JSON.parse(s);
      return normalizeToArray<T>(parsed);
    } catch {
      // not JSON -> show as single text
      return [val as any];
    }
  }

  if (typeof val === "object") {
    if (Array.isArray((val as any).items)) return (val as any).items as T[];
    return [val as T];
  }

  return [];
}

const qualifications = computed<QualificationItem[]>(() =>
  normalizeToArray<QualificationItem>(provider.value?.qualifications)
);

const clients = computed<ClientItem[]>(() =>
  normalizeToArray<ClientItem>(provider.value?.clients)
);

onMounted(async () => {
  // Fetch all districts for mapping
  await fetchAllDistricts("en");

  const id = Number(route.params.id);
  if (!id) return;
  provider.value = await fetchProviderDetail(id, "en");
});

const goBack = () => navigateTo("/directory");

useSeoMeta({
  title: computed(() => (provider.value ? `${provider.value.business_name} - Public Directory` : "Provider")),
  description: computed(() => provider.value?.description || "Service provider profile"),
});
</script>

<style scoped>
.hero-section {
  padding: 3rem 0;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.12) 0%,
    rgba(var(--v-theme-surface), 0.92) 100%
  );
}
.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  color: rgb(var(--v-theme-section-title));
}
.hero-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgb(var(--v-theme-section-subtitle));
}

.hero-back-btn {
  border-radius: 10px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  border-bottom: 2px solid rgb(var(--v-theme-accent));
  padding-bottom: 0.4rem;
}
.subsection-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
}
.info-card {
  background-color: rgb(var(--v-theme-service-card-bg));
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-outline), 0.12);
}

.bg-section-title {
  background: rgb(var(--v-theme-primary));
}

.text-on-primary {
  color: rgb(var(--v-theme-on-primary));
}

.label {
  font-size: 0.85rem;
  opacity: 0.75;
}
.value {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}
</style>
