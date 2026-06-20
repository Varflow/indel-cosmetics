interface UsePostsListOptions {
  limit?: number;
}

export const usePostsList = async (options: UsePostsListOptions = {}) => {
  const { find } = useStrapi();
  const { getImage } = useStrapiImage();

  const { data: response } = await useAsyncData(
    `posts-list-${options.limit ?? "all"}`,
    () =>
      find<any>("novostis", {
        populate: { image: true },
        ...(options.limit
          ? { pagination: { start: 0, limit: options.limit } }
          : {}),
        sort: "createdAt:desc",
      })
  );

  const posts = computed(() =>
    (response.value?.data ?? []).map((post: any) => ({
      id: post.documentId,
      image: getImage(post.image?.url),
      title: post.title,
      text: post.text,
      createdAt: new Date(post.createdAt).toLocaleDateString(),
    }))
  );

  return { posts };
};
