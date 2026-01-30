export default defineNuxtPlugin(async () => {
  const STORAGE_KEY = "ppa_visited";

  if (sessionStorage.getItem(STORAGE_KEY)) {
    return;
  }

  const config = useRuntimeConfig();
  const backendUrl = config.public.backendUrl;
  const sessionId = crypto.randomUUID();

  try {
    await $fetch(`${backendUrl}/site_visits/`, {
      method: "POST",
      body: {
        session_id: sessionId,
        user_agent: navigator.userAgent,
      },
    });
  } catch (e) {
    console.warn("Site visit tracking failed:", e);
  }

  sessionStorage.setItem(STORAGE_KEY, "1");
});
