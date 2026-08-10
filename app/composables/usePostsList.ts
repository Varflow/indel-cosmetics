interface UsePostsListOptions {
  limit?: number;
}

// Upper bound for the single page we fetch before sorting locally.
const POSTS_FETCH_LIMIT = 100;

export const usePostsList = async (options: UsePostsListOptions = {}) => {
  const { locale } = useLocale();
  const { find } = useStrapi();
  const { getImage } = useStrapiImage();
  const { getTimestamp, format } = usePostDate();

  // `options.limit` is applied after sorting instead of in the query: Strapi can
  // only sort by the per-locale `createdAt`, so cutting to N server-side would
  // pick a different N in each locale. The collection is small enough to fetch
  // in one page and trim locally.
  const { data: response } = await useAsyncData(
    `posts-list-${locale.value}`,
    () =>
      find<any>("novostis", {
        populate: {
          image: true,
          // Needed to resolve one shared date across locales — see usePostDate.
          localizations: { fields: ["locale", "createdAt"] },
        },
        pagination: { start: 0, limit: POSTS_FETCH_LIMIT },
        sort: "createdAt:desc",
        locale: locale.value,
      }),
    { watch: [locale] }
  );

  const posts = computed(() => {
    const sorted = (response.value?.data ?? [])
      .map((post: any) => ({
        id: post.documentId,
        image: getImage(post.image?.url),
        title: post.title,
        text: post.text,
        timestamp: getTimestamp(post),
        createdAt: format(getTimestamp(post)),
      }))
      // Strapi sorted by the per-locale createdAt; re-sort by the shared date
      // so the visible order matches the visible dates in every locale.
      .sort((a: any, b: any) => (b.timestamp ?? 0) - (a.timestamp ?? 0));

    return options.limit ? sorted.slice(0, options.limit) : sorted;
  });

  return { posts };
};
