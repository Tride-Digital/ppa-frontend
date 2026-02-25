<template>
  <v-card class="provider-card h-100" elevation="4" hover @click="$emit('click')">
    <div class="card-image-container">
      <v-img :src="imageSrc" height="var(--dir-card-img-height)" cover class="card-image">
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
        </template>
      </v-img>

      <div class="image-overlay d-flex gap-2">
        <v-chip v-if="provider.is_featured" size="small" color="primary" variant="elevated" class="category-chip">
          <v-icon start size="small">mdi-star</v-icon>
          Featured
        </v-chip>
        <v-chip v-if="provider.has_certifications" size="small" color="success" variant="elevated" class="category-chip">
          <v-icon start size="small">mdi-certificate</v-icon>
          Verified
        </v-chip>
      </div>
    </div>

    <div class="title-rating-container">
      <v-card-title class="provider-name">
        {{ provider.business_name }}
      </v-card-title>

      <div class="rating-section" v-if="averageRating">
        <v-chip color="success" variant="tonal" size="x-small">
          <span v-for="star in 5" :key="star" style="font-size: 0.85rem; margin: 0 2px;">
            {{ star <= Math.round(averageRating.average_rating || 0) ? '★' : '☆' }}
          </span>
          {{ averageRating.average_rating?.toFixed(1) || '' }} ({{ averageRating.rating_count || 0 }})
        </v-chip>
      </div>
    </div>

    <v-card-text class="provider-meta">
      <div class="text-body-2 mb-2" style="opacity:.9" v-if="provider.owner_name">
        <v-icon size="16" class="me-1">mdi-account</v-icon>
        {{ provider.owner_name }}
      </div>

      <div class="text-body-2 mb-2" v-if="provider.province_name || provider.district_name">
        <v-icon size="16" class="me-1">mdi-map-marker</v-icon>
        {{ provider.province_name || provider.province_code }} • {{ provider.district_name || provider.district_code }}
      </div>

      <div class="chips mt-2">
        <v-chip
          v-for="(t, i) in serviceTags"
          :key="i"
          size="x-small"
          variant="tonal"
          color="primary"
          class="me-1 mb-1"
        >
          {{ t }}
        </v-chip>
      </div>

      <div class="desc mt-3" v-if="provider.description || provider.other_services?.[0]?.serviceDescription">
        {{ provider.description || provider.other_services?.[0]?.serviceDescription }}
      </div>
    </v-card-text>

    <v-card-actions class="card-actions">
      <v-btn variant="outlined" color="primary" size="small" @click.stop="$emit('view')">
        View Details
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
      <v-spacer />
      <!-- <v-spacer />
      <v-btn variant="outlined" color="primary" size="small" @click.stop="copyContact">
        <v-icon start>mdi-content-copy</v-icon>
        Contact
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { ProviderCard } from "~/composables/usePublicDirectory";
import { usePublicDirectory } from "~/composables/usePublicDirectory";

const props = defineProps<{
  provider: ProviderCard;
}>();

defineEmits<{
  (e: "click"): void;
  (e: "view"): void;
}>();

const { getProviderAverageRating } = usePublicDirectory();
const averageRating = ref<any>(null);

const PLACEHOLDER_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/037/336/395/small/user-profile-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-free-vector.jpg";

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "avif",
  "bmp",
  "ico",
  "tif",
  "tiff",
]);

const BLOCKED_FILE_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "zip",
  "rar",
  "7z",
  "mp4",
  "mov",
  "avi",
  "mp3",
  "wav",
]);

const getFileExtension = (value: string) => {
  const trimmed = value.trim();
  const urlWithoutQueryOrHash = trimmed.split("#")[0]?.split("?")[0] || "";
  const extension = urlWithoutQueryOrHash.split(".").pop()?.toLowerCase();
  return extension || "";
};

const isAllowedImageSource = (value?: string | null) => {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  // Allow inline/base64 image data URLs and block non-image data URLs.
  if (trimmed.startsWith("data:")) {
    return /^data:image\//i.test(trimmed);
  }

  const extension = getFileExtension(trimmed);
  if (!extension) return false;
  if (BLOCKED_FILE_EXTENSIONS.has(extension)) return false;
  return ALLOWED_IMAGE_EXTENSIONS.has(extension);
};

const imageSrc = computed(() => {
  const candidates = [
    props.provider.profile_picture,
    props.provider.image_url,
    props.provider.logo_url,
  ];

  return (
    candidates.find((src) => isAllowedImageSource(src)) ||
    PLACEHOLDER_IMAGE
  );
});

const serviceTags = computed(() => {
  // show unique categories/subcategories (short)
  const subs = props.provider.services?.map((s: any) => s.subcategory).filter(Boolean) as string[];
  const unique = Array.from(new Set(subs));
  return unique.slice(0, 6);
});

onMounted(async () => {
  try {
    averageRating.value = await getProviderAverageRating(props.provider.id);
  } catch (error) {
    console.error('Failed to load average rating:', error);
    averageRating.value = null;
  }
});

const copyContact = async () => {
  const email = props.provider.email || "";
  const phone = props.provider.phone || "";
  const website = props.provider.website || "";
  const text = [phone && `Phone: ${phone}`, email && `Email: ${email}`, website && `Web: ${website}`].filter(Boolean).join("\n");
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {}
};
</script>

<style scoped>
.provider-card {
  width: 100%;
  min-height: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background-color: rgb(var(--v-theme-service-card-bg));
}
.provider-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgb(var(--v-theme-card-shadow-hover));
}
.card-image-container {
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  height: 160px;
}
.card-image {
  transition: transform 0.3s ease;
  height: 160px !important;
}
.provider-card:hover .card-image {
  transform: scale(1.05);
}
.image-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-width: calc(100% - 24px);
}
.category-chip {
  backdrop-filter: blur(10px);
  color: rgb(var(--v-theme-on-primary)) !important;
}

.title-rating-container {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px 0 16px;
  min-height: 60px;
}

.provider-name {
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
  line-height: 1.3;
  padding: 0;
  white-space: normal;
  overflow: hidden;
  word-break: break-word;
  hyphens: auto;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.rating-section {
  position: static;
  align-self: flex-start;
  white-space: nowrap;
  flex-shrink: 0;
}

.provider-meta {
  color: rgb(var(--v-theme-section-subtitle));
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  line-height: 1.5;
  padding: 8px 16px;

  flex: 1 1 auto;
  min-height: 80px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  gap: 4px;
  flex: 1 1 auto;
  align-content: flex-start;
}
.desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;
}
.card-actions {
  margin-top: auto;
  padding: 12px 16px;
  gap: 8px;
  background-color: rgb(var(--v-theme-service-card-bg));
  flex-shrink: 0;
}

@media (max-width: 1400px) {
  .provider-card {
    min-height: 400px;
  }
  .card-image-container {
    height: 150px;
  }
  .card-image {
    height: 150px !important;
  }
}

@media (max-width: 1200px) {
  .provider-card {
    min-height: 380px;
  }
  .card-image-container {
    height: 140px;
  }
  .card-image {
    height: 140px !important;
  }
  .title-rating-container {
    padding: 10px 14px 0 14px;
    min-height: 55px;
  }
  .provider-meta {
    padding: 6px 14px;
    min-height: 70px;
  }
  .card-actions {
    padding: 10px 14px;
  }
}

@media (max-width: 960px) {
  .provider-card {
    min-height: 360px;
  }
  .card-image-container {
    height: 130px;
  }
  .card-image {
    height: 130px !important;
  }
  .title-rating-container {
    padding: 8px 12px 0 12px;
    min-height: 50px;
  }
  .provider-meta {
    padding: 6px 12px;
    min-height: 60px;
  }
  .card-actions {
    padding: 8px 12px;
  }
}

@media (max-width: 600px) {
  .provider-card {
    min-height: 340px;
  }
  .card-image-container {
    height: 120px;
  }
  .card-image {
    height: 120px !important;
  }
  .image-overlay {
    top: 8px;
    right: 8px;
  }
  .title-rating-container {
    padding: 8px 10px 0 10px;
    gap: 4px;
  }
  .provider-meta {
    padding: 4px 10px;
  }
  .card-actions {
    padding: 8px 10px;
  }
}
</style>
