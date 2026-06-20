export const useCompanyInfo = async () => {
  const { locale } = useLocale();
  const { find } = useStrapi();
  const { getImage } = useStrapiImage();

  const { data: response } = await useAsyncData(
    `company-info-${locale.value}`,
    async () => {
      const [info, team] = await Promise.all([
        // o-kompanii has only text/richtext fields (images on the page are static)
        find<any>("o-kompanii", { locale: locale.value }),
        find<any>("komandas", {
          populate: { avatar: true },
          locale: locale.value,
        }),
      ]);
      return { info: info.data, team: team.data };
    },
    { watch: [locale] }
  );

  const companyInfo = computed(() => {
    const data = response.value?.info;
    if (!data) return null;
    return Array.isArray(data) ? data[0] : data;
  });

  const team = computed(() =>
    (response.value?.team ?? []).map((member: any) => ({
      ...member,
      avatar: getImage(member?.avatar?.url),
    }))
  );

  return { companyInfo, team };
};
