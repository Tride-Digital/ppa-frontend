import { computed } from 'vue';

type StaticContent = {
  type: string;
  content: string | null;
  short_description?: string | null;
  id?: number;
};

export const useStaticContent = (type: string) => {
  const config = useRuntimeConfig();
  const key = `static-content-${type}`;

  const { data, pending, error } = useAsyncData<StaticContent>(
    key,
    () => $fetch<StaticContent>(`${config.public.backendUrl}/static_content/${type}`)
  );

  const content = computed(() => data.value?.content ?? '');

  return { content, data, pending, error };
};