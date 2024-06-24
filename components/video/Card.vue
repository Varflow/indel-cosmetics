<template>
  <div class="video-card">
    <div class="video-card__iframe" v-html="video"></div>
    <h3 class="video-card__title" v-html="title"></h3>
  </div>
</template>

<script>
export default {
  props: ["title", "video"],
  setup() {},
};
</script>
