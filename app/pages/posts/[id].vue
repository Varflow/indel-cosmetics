<template>
  <div class="post-page" v-if="post">
    <Head>
      <Title> {{ plainTitle }}</Title>
      <Meta name="description" :content="post?.text?.substring(0, 100)" />
      <Meta name="og:title" :content="` ${plainTitle}`" />
      <Meta name="og:description" :content="post?.text?.substring(0, 100)" />
      <Meta name="og:image" :content="post?.image ?? ''" />
    </Head>
    <div class="container">
      <div class="col-12 col-lg-10 offset-lg-1">
        <div class="row post-page__header">
          <div class="col-12 col-lg-6 post-page__image">
            <img :src="post.image ?? ''" :alt="plainTitle" />
          </div>
          <div class="col-12 col-lg-6 post-page__info">
            <div class="post-page__meta">{{ post.createdAt }}</div>
            <h2 class="post-page__title" v-html="post.title"></h2>
          </div>
        </div>
        <div class="post-page__text" v-html="post.text"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { post } = await usePostBySlug(route.params.id as string);

// Title may contain inline HTML (e.g. <sup>®</sup>): rendered via v-html,
// stripped to plain text for alt/meta.
const plainTitle = computed(
  () => post.value?.title?.replace(/<[^>]*>/g, "") ?? "",
);

// Per-locale SEO meta — post arrives in the active locale via the
// locale-aware composable; derive a short description from its body.
useSeoMeta({
  title: () => plainTitle.value,
  description: () =>
    post.value?.text?.replace(/<[^>]*>/g, "").slice(0, 160) ?? "",
  ogTitle: () => plainTitle.value,
  ogDescription: () =>
    post.value?.text?.replace(/<[^>]*>/g, "").slice(0, 160) ?? "",
  ogImage: () => post.value?.image ?? "",
});
</script>
