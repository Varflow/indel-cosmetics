<!-- All categories applications -->
<template>
  <div class="category-page">
    <Head>
      <Title>Використання</Title>
      <Meta name="og:title" :content="` Indredients`" />
      <Meta name="og:image" content="/images/banners/ingredients.jpeg" />
    </Head>
    <div class="container">
      <AppPageBanner
        title="Використання"
        img="/images/banners/ingredients.jpeg"
      />

      <div class="row categories-list gy-5">
        <div class="col-12 col-lg-4" v-for="category of applicationsForView">
          <NuxtLink
            class="category-card__link"
            :to="
              category.children && category.children.length
                ? `/applications/${category.id}`
                : `/category/${category.id}`
            "
          >
            <CategoryCard
              :name="category.name"
              :image="category.image ? `${media}${category.image}` : null"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import orderBy from "lodash.orderby";

const toView = (collection) => {
  if (!collection) {
    return [];
  }

  return collection.map((collection) => {
    return {
      id: collection.id,
      name: collection.attributes.Name,
      image: collection.attributes.image?.data?.attributes?.url,
      children: !collection.attributes.pod_kategoriyas?.data.length
        ? null
        : orderBy(
            collection.attributes.pod_kategoriyas?.data.map((subcategory) => {
              return {
                id: subcategory.id,
                name: subcategory.attributes.name,
                order: subcategory.attributes.order,
              };
            }),
            ["order"],
            ["asc"]
          ),
      order: collection.attributes.order,
    };
  });
};

export default {
  async setup() {
    try {
      const { find } = useStrapi();
      const media = useStrapiMedia();

      const categories = await find("categories", {
        populate: {
          pod_kategoriyas: {
            populate: {
              image: "*",
            },
          },
        },
      });

      const applications = categories.data.filter(
        (category) => category.attributes.section === "application"
      );

      const applicationsForView = toView(applications);
      const orderedApplications = orderBy(
        applicationsForView,
        ["order"],
        ["asc"]
      );

      return {
        applicationsForView: orderedApplications,
        media,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
