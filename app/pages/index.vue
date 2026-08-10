<template>
  <div class="home-page">
    <Head>
      <Title>Indel Cosmetics</Title>
      <Link rel="canonical" href="https://indelcosm.com.ua" />
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

<script setup lang="ts">
const { texts } = useGlobalTexts();
</script>
