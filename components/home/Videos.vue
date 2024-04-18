<template>
  <div class="section-posts">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Indel videos</h2>
      </div>

      <VideoList />

      <div class="section-actions">
        <NuxtLink to="/videos" class="link-without-decoration">
          <AppButton variant="black">View all videos</AppButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
