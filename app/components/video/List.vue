<template>
  <div :class="full ? 'video-list--full' : 'video-list'">
    <VideoCard
      v-for="video in displayedVideos"
      :key="video.id"
      :title="video.title"
      :video="video.video"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ full?: boolean }>();

const { videos } = await useVideosList();

const displayedVideos = computed(() =>
  props.full ? videos.value : videos.value.slice(0, 3)
);
</script>

<style lang="scss" scoped></style>
