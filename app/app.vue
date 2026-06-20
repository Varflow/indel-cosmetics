<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Emit hreflang alternates + canonical (+ og:locale) for every page across both locales.
const localeHead = useLocaleHead({ seo: true });
useHead(localeHead);
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
