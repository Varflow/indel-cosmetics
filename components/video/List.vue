<template>
  <div :class="full ? 'video-list--full' : 'video-list'">
    <VideoCard
      v-for="video in videos"
      :title="video.title"
      :video="video.video"
    />
  </div>
</template>

<script>
export default {
  props: ["full"],
  async setup(props) {
    const { find } = useStrapi();
    const videos = await find("video-glavnayas");

    const videosForView = videos.data.map((video) => {
      return {
        title: video.attributes.title,
        video: video.attributes.video,
      };
    });

    return {
      videos: props.full ? videosForView : videosForView.splice(0, 3),
    };
  },
};
</script>

<style lang="scss" scoped></style>
