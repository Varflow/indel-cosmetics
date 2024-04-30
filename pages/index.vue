<template>
  <div class="home-page">
    <Head>
      <Title>Chempha</Title>
      <Link rel="canonical" href="https://chempha.com" />
      <Meta
        name="google-site-verification"
        content="t5h28M5twka3Ii02_z1gXTKtr-UN0KOGhHbq619dCbQ"
      />
    </Head>
    <BannersMain />
    <BannersAbout :texts="texts" />
    <HomePortfolio :texts="texts" />
    <HomeProducts :texts="texts" />
    <HomePosts :texts="texts" />
    <HomeVideos :texts="texts" />
  </div>
</template>

<script lang="ts">
export default {
  async setup() {
    const { findOne } = useStrapi();

    const globalTexts = await findOne("teksty");

    return {
      texts: globalTexts.data.attributes,
    };
  },
};
</script>
