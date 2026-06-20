<template>
  <div class="news-page">
    <Head>
      <Title>Indel Cosmetics News</Title>
      <Meta name="og:title" content="Indel Cosmetics News" />
    </Head>
    <div class="container">
      <AppPageBanner :title="$t('Новини')" />
      <div class="posts-list-container">
        <PostList />
      </div>
    </div>
  </div>
</template>

