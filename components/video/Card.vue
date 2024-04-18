<template>
  <div class="video-card">
    <div class="video-card__iframe" v-html="video"></div>
    <div class="video-card__title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "video"],
  setup() {},
};
</script>
