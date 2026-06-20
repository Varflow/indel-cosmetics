<template>
  <div class="search-page">
    <div class="container">
      <AppPageBanner :title="$t('Результати пошуку')" />
      <div class="search-container--full">
        <input
          type="text"
          class="search-container__input"
          :placeholder="$t('Результати пошуку...')"
          v-model="query"
          v-on:keyup.enter="search"
        />
        <div class="search-container__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="512"
            height="512"
          >
            <path
              d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"
            />
          </svg>
        </div>
      </div>

      <AppLoader v-if="loading" />

      <div
        class="row products-list gy-5"
        v-if="!loading && (products.length || posts.length)"
      >
        <div class="col-12 col-lg-3" v-for="product of products" :key="product.id">
          <ProductCard
            :id="product.id"
            :name="product.name"
            :category="product.category"
            :image="product.image"
          />
        </div>

        <div class="col-lg-4 col-xl-3 gy-5" v-for="post of posts" :key="post.id">
          <NuxtLink :to="`/posts/${post.id}`" class="link-without-decoration">
            <PostCard
              :title="post.title"
              :createdAt="post.createdAt"
              :image="post.image"
            />
          </NuxtLink>
        </div>
      </div>

      <div class="search-empty" v-else>
        <h1 class="search-empty__title">{{ $t("Немає результатів пошуку") }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { query, products, posts, loading, search } = useProductSearch(
  (route.query.q as string) ?? ""
);

watch(
  () => route.query.q,
  (val) => {
    query.value = (val as string) ?? "";
    search();
  }
);

const doSearch = () => {
  router.replace({ query: { q: query.value } });
  search();
};

onMounted(() => {
  search();
});
</script>
