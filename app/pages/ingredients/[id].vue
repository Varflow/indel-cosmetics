<!-- Ingredients category detail — shows subcategories -->
<template>
  <div class="category-page">
    <Head>
      <Title> {{ category?.name }}</Title>
      <Meta name="og:title" :content="` ${category?.name}`" />
      <Meta name="og:image" :content="category?.banner ?? ''" />
    </Head>
    <div class="container">
      <AppPageBanner :title="category?.name" :img="category?.banner" />

      <div class="row categories-list gy-5">
        <div class="col-12 col-lg-4" v-for="subcategory of subcategories" :key="subcategory.id">
          <NuxtLink
            :to="`/subcategory/${subcategory.id}`"
            class="category-card__link"
          >
            <CategoryCard
              :name="subcategory.name"
              :image="subcategory.image ?? null"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { category, subcategories } = await useCategoryBySlug(route.params.id as string, {
  withSubcategories: true,
  withProducts: false,
});
</script>
