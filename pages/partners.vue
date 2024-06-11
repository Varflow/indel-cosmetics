<template>
  <div class="partners-page">
    <Head>
      <Title>Partners</Title>
      <Meta name="og:title" content="Indel Cosmetics Partners" />
    </Head>
    <div class="container">
      <AppPageBanner img="/images/banners/partner.jpg" title="Партнери" />

      <div class="section-header">
        <h2 class="section-title">Наші партнери</h2>
      </div>
      <div class="row partners-list gy-5">
        <a
          class="col-12 col-lg-4 partner-item"
          v-for="partner of partnersForView"
          :href="partner.link"
          target="_blank"
        >
          <img :src="partner.logo" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async setup() {
    try {
      const media = useStrapiMedia();
      const { find } = useStrapi();

      const partners = await find("partners", {
        populate: "*",
      });

      console.log(partners);

      const partnersForView = partners.data.map((partner) => {
        return {
          ...partner.attributes,
          logo: `${media}${partner.attributes.logo.data[0]?.attributes.url}`,
        };
      });

      return { partnersForView };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
