// composables/useLocations.ts
import { ref } from "vue";

export type Province = { province_code: string; province_en?: string; province_si?: string; province_ta?: string };
export type District = { district_code: string; district_en?: string; district_si?: string; district_ta?: string };

export function useLocations() {
  const config = useRuntimeConfig();

  const provinces = ref<Province[]>([]);
  const districts = ref<District[]>([]);
  const loading = ref(false);

  const fetchProvinces = async (lan: "en" | "si" | "ta" = "en") => {
    loading.value = true;
    try {
      const apiBase = config.public.backendUrl;
      provinces.value = await $fetch(`${apiBase}/gn_division_list/all_province`, { query: { lan } });
    } finally {
      loading.value = false;
    }
  };

  const fetchDistrictsByProvince = async (province_code: string, lan: "en" | "si" | "ta" = "en") => {
    loading.value = true;
    try {
      const apiBase = config.public.backendUrl;
      districts.value = await $fetch(`${apiBase}/gn_division_list/distrct_by_province`, {
        query: { province_id: province_code, lan },
      });
    } finally {
      loading.value = false;
    }
  };

  const fetchAllDistricts = async (lan: "en" | "si" | "ta" = "en") => {
    loading.value = true;
    try {
      const apiBase = config.public.backendUrl;
      districts.value = await $fetch(`${apiBase}/gn_division_list/all_district`, {
        query: { lan },
      });
    } finally {
      loading.value = false;
    }
  };

  const resetDistricts = () => (districts.value = []);

  return { provinces, districts, loading, fetchProvinces, fetchDistrictsByProvince, fetchAllDistricts, resetDistricts };
}
