<template>
  <v-dialog
    v-model="open"
    max-width="720"
    scrollable
  >
    <v-card class="quote-dialog-card" elevation="8">
      <v-card-title class="dialog-title d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon class="me-2">mdi-email-fast</v-icon>
          <span>Request a Quote</span>
        </div>

        <v-btn icon variant="text" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-subtitle class="px-6 pb-0">
        Send a request to <b>{{ providerName }}</b>
      </v-card-subtitle>

      <v-card-text class="px-6 pt-4">
        <v-alert type="info" variant="tonal" density="compact" class="mb-4">
          Tip: Add service type, location, timeline, and budget range for a faster response.
        </v-alert>

        <v-form ref="formRef" @submit.prevent="submit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.requester_name"
                label="Your name"
                variant="outlined"
                density="comfortable"
                :rules="[rules.required]"
                prepend-inner-icon="mdi-account"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.requester_email"
                label="Email"
                variant="outlined"
                density="comfortable"
                :rules="[rules.required, rules.email]"
                prepend-inner-icon="mdi-email"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.requester_phone"
                label="Phone (optional)"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-phone"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="form.message"
                label="Message"
                variant="outlined"
                density="comfortable"
                :rules="[rules.required, rules.min10]"
                prepend-inner-icon="mdi-message-text"
                rows="4"
                auto-grow
              />
            </v-col>
          </v-row>

          <button type="submit" style="display:none;"></button>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-6 py-4">
        <v-btn variant="text" @click="close">
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          size="large"
          :loading="submitting"
          :disabled="submitting"
          @click="submit"
        >
          <v-icon start>mdi-send</v-icon>
          Submit Request
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar.show" :timeout="3500">
      {{ snackbar.text }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuoteRequests } from "~/composables/useQuoteRequests";

const props = defineProps<{
  modelValue: boolean;
  providerId: number;
  providerName: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "submitted"): void;
}>();

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

const { submitting, createQuoteRequest } = useQuoteRequests();

const formRef = ref<any>(null);
const snackbar = ref({ show: false, text: "" });

const form = ref({
  requester_name: "",
  requester_email: "",
  requester_phone: "",
  message: "",
});

const rules = {
  required: (v: any) => (!!v && String(v).trim().length > 0) || "Required",
  email: (v: any) => {
    const s = String(v || "").trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    return ok || "Invalid email";
  },
  min10: (v: any) => (String(v || "").trim().length >= 10) || "Please add a bit more detail (min 10 chars)",
};

const reset = () => {
  form.value = { requester_name: "", requester_email: "", requester_phone: "", message: "" };
  formRef.value?.resetValidation?.();
};

const close = () => {
  open.value = false;
  reset();
};

const submit = async () => {
  const res = await formRef.value?.validate?.();
  if (res && res.valid === false) return;

  try {
    await createQuoteRequest({
      provider_id: props.providerId,
      requester_name: form.value.requester_name.trim(),
      requester_email: form.value.requester_email.trim(),
      requester_phone: form.value.requester_phone?.trim() || null,
      message: form.value.message.trim(),
    });

    snackbar.value = { show: true, text: "Quote request submitted successfully." };
    emit("submitted");
    close();
  } catch (e: any) {
    const msg = e?.data?.detail || e?.message || "Failed to submit. Please try again.";
    snackbar.value = { show: true, text: msg };
  }
};
</script>

<style scoped>
.quote-dialog-card {
  border-radius: 16px;
  overflow: hidden;
  background-color: rgb(var(--v-theme-surface));
}
.dialog-title {
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
  padding: 18px 18px 10px 18px;
}
</style>
