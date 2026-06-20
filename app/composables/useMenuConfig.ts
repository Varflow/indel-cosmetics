export const useMenuConfig = async () => {
  const { find } = useStrapi();

  const { data: response } = await useAsyncData("menu-config", () =>
    find<any>("menyu")
  );

  const menu = computed(() => {
    const data = response.value?.data;
    console.log("data", data)
    if (!data) return null;
    return Array.isArray(data) ? data[0] ?? null : data;
  });

  return { menu };
};
