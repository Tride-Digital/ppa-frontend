export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { public: pub } = useRuntimeConfig();

  router.afterEach((to) => {
    // If GA not configured, do nothing
    if (!pub.ga4Id) return;

    // Make sure gtag exists (it will after gtag.js loads)
    if (typeof window.gtag !== "function") return;

    // Send page view on every route change (SPA navigation)
    window.gtag("config", pub.ga4Id, {
      page_path: to.fullPath,
    });
  });
});
