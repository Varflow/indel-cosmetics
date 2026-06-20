export const useGlobalTexts = () => {
  const { find } = useStrapi();

  const { data: response } = useAsyncData("global-texts", () =>
    find<any>("teksty")
  );

  const texts = computed(() => {
    const data = response.value?.data;
    if (!data) return null;
    return Array.isArray(data) ? data[0] ?? null : data;
  });

  return { texts };
};
