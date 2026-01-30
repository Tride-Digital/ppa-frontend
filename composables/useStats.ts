import { ref } from 'vue';

interface UserAppStatsResponse {
  total_applications: number;
  pending_count: number;
  approved_count: number;
  rejected_count: number;
  payment_done_count: number;
}

interface EstateStatsResponse {
  total_estates: number;
  pending_count: number;
  approved_count: number;
  rejected_count: number;
  not_submitted_count: number;
  crop_stats: {
    distinct_crops_count: number;
    total_harvested_area: number;
    crops_detail: string[];
  };
}

interface ProviderStatsResponse {
  total_applications: number;
  pending_count: number;
  approved_count: number;
  rejected_count: number;
}

interface ProductionCostStatsResponse {
  total_revenue_all_clients: number;
  client_count: number;
}

interface SiteVisitStatsResponse {
  total_visits: number;
  unique_ips: number;
}

const userApplications = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  payment_done: 0,
});

const estateRegistrations = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  not_submitted: 0,
  crop_stats: {
    distinct_crops_count: 0,
    total_harvested_area: 0,
    crops_detail: [] as string[],
  },
});

const serviceProviders = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
});

const productionCostStats = ref({
  total_revenue_all_clients: 0,
  client_count: 0,
});

const siteVisitStats = ref({
  total_visits: 0,
  unique_ips: 0,
});

// Retainer Clients Stats
async function fetchUserAppStats() {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("access_token");
    const response = await $fetch<UserAppStatsResponse>(`${config.public.backendUrl}/membershipapplication/stats/dashboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    userApplications.value = {
      total: response.total_applications || 0,
      pending: response.pending_count || 0,
      approved: response.approved_count || 0,
      rejected: response.rejected_count || 0,
      payment_done: response.payment_done_count || 0,
    };
  } catch (error) { 
    console.error("Error fetching user application stats:", error); 
  }
}

// Estate Registration Stats
async function fetchEstateStats() {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("access_token");
    const response = await $fetch<EstateStatsResponse>(`${config.public.backendUrl}/estates/stats/dashboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    estateRegistrations.value = {
      total: response.total_estates || 0,
      pending: response.pending_count || 0,
      approved: response.approved_count || 0,
      rejected: response.rejected_count || 0,
      not_submitted: response.not_submitted_count || 0,
      crop_stats: {
        distinct_crops_count: response.crop_stats?.distinct_crops_count || 0,
        total_harvested_area: response.crop_stats?.total_harvested_area || 0,
        crops_detail: response.crop_stats?.crops_detail || [],
      },
    };
  } catch (error) { 
    console.error("Error fetching estate stats:", error); 
  }
}

// Service Provider Stats
async function fetchProviderStats() {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch<ProviderStatsResponse>(`${config.public.backendUrl}/service-provider/stats/dashboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    serviceProviders.value = {
      total: response.total_applications || 0,
      pending: response.pending_count || 0,
      approved: response.approved_count || 0,
      rejected: response.rejected_count || 0,
    };
  } catch (error) { 
    console.error("Error fetching provider stats:", error); 
  }
}

// Production and Cost Stats
async function fetchProductionCostStats() {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch<ProductionCostStatsResponse>(`${config.public.backendUrl}/rc_self_monitor/production_and_cost/stats/dashboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    productionCostStats.value = {
      total_revenue_all_clients: response.total_revenue_all_clients || 0,
      client_count: response.client_count || 0,
    };
  } catch (error) { 
    console.error("Error fetching production cost stats:", error); 
  }
}

// Site Visit Stats
async function fetchSiteVisitStats() {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch<SiteVisitStatsResponse>(`${config.public.backendUrl}/site_visits/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    siteVisitStats.value = {
      total_visits: response.total_visits || 0,
      unique_ips: response.unique_ips || 0,
    };
  } catch (error) {
    console.error("Error fetching site visit stats:", error);
  }
}

export const useStats = () => {
  return {
    userApplications,
    estateRegistrations,
    serviceProviders,
    productionCostStats,
    siteVisitStats,
    fetchUserAppStats,
    fetchEstateStats,
    fetchProviderStats,
    fetchProductionCostStats,
    fetchSiteVisitStats,
  };
};
