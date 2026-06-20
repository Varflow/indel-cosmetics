export const usePartnersList = async () => {
  const { find } = useStrapi();
  const { getImage } = useStrapiImage();

  const { data: response } = await useAsyncData("partners-list", () =>
    find<any>("partners", {
      populate: { logo: true },
      pagination: { page: 1, pageSize: 100 },
    })
  );

  const partners = computed(() =>
    (response.value?.data ?? []).map((partner: any) => ({
      ...partner,
      id: partner.documentId,
      logo: getImage(
        Array.isArray(partner.logo)
          ? partner.logo[0]?.url
          : partner.logo?.url
      ),
    }))
  );

  return { partners };
};
