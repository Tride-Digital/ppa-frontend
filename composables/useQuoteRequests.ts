import { ref } from "vue";

export type QuoteRequestCreate = {
  provider_id: number;
  requester_name: string;
  requester_email: string;
  requester_phone?: string | null;
  message: string;
};

export type QuoteRequestOut = QuoteRequestCreate & {
  id: number;
  status: "new" | "reviewed" | "quoted" | "closed";
  created_at: string;
  updated_at: string;
};

export function useQuoteRequests() {
  const config = useRuntimeConfig();
  const submitting = ref(false);

  const createQuoteRequest = async (payload: QuoteRequestCreate) => {
    submitting.value = true;
    try {
      const apiBase = config.public.backendUrl;
      const res = await $fetch<QuoteRequestOut>(`${apiBase}/quote-requests/`, {
        method: "POST",
        body: payload,
      });
      return res;
    } finally {
      submitting.value = false;
    }
  };

  return { submitting, createQuoteRequest };
}
