<!-- All categories applications -->
<template>
  <div class="category-page">
    <Head>
      <Title>{{ $t("Використання") }}</Title>
      <Meta name="og:title" :content="` Indredients`" />
      <Meta name="og:image" content="/images/banners/ingredients.jpeg" />
    </Head>
    <div class="container">
      <AppPageBanner
        :title="$t('Використання')"
        img="/images/banners/ingredients.jpeg"
      />

      <div class="row categories-list gy-5">
        <div class="col-12 col-lg-4" v-for="category of categories" :key="category.id">
          <NuxtLink
            class="category-card__link"
            :to="
              category.children && category.children.length
                ? `/applications/${category.id}`
                : `/category/${category.id}`
            "
          >
            <CategoryCard
              :name="category.name"
              :image="category.image ?? null"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories } = await useCategoriesList({ section: "application" });
</script>
