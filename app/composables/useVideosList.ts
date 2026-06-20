interface UseVideosListOptions {
  limit?: number;
}

export const useVideosList = async (options: UseVideosListOptions = {}) => {
  const { find } = useStrapi();

  const { data: response } = await useAsyncData(
    `videos-list-${options.limit ?? "all"}`,
    () =>
      find<any>("video-glavnayas", {
        ...(options.limit
          ? { pagination: { start: 0, limit: options.limit } }
          : {}),
      })
  );

  const videos = computed(() =>
    (response.value?.data ?? []).map((video: any) => ({
      id: video.documentId,
      title: video.title,
      video: video.video,
    }))
  );

  return { videos };
};
