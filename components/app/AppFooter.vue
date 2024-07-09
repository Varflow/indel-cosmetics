<template>
  <footer class="footer container">
    <div class="row gy-5">
      <div class="col-lg-4">
        <h4 class="footer-col__title">Контакти</h4>
        <div class="footer-col__list">
          <div class="footer-col__item">ТОВ "Індел"</div>
          <div class="footer-col__item">Вул. М. Грушевського , 39Д</div>
          <div class="footer-col__item">Одеса, 65031, Україна</div>
          <a href="tel:+380 50 673-27-09" class="footer-col__item"
            >Tel./fax: +380 50 673-27-09</a
          >
          <a href="tel:+380 95 285-88-27" class="footer-col__item"
            >Tel./fax: +380 95 285-88-27</a
          >
          <a href="tel:+380 48 737-33-25" class="footer-col__item"
            >Tel./fax: +380 48 737-33-25</a
          >
          <a href="mailto:info@indel.com.ua" class="footer-col__item"
            >info@indel.com.ua</a
          >
          <a
            href="http://indel.com.ua/"
            target="_blank"
            class="footer-col__item"
            >www.indel.com.ua</a
          >
        </div>
      </div>
      <div class="col-lg-4">
        <h4 class="footer-col__title">Інгредієнти</h4>
        <div class="footer-col__list">
          <NuxtLink
            v-for="category of ingredientsForView"
            :to="
              Boolean(category.children?.length)
                ? `/ingredients/${category.id}`
                : `/category/${category.id}`
            "
            class="footer-col__item"
          >
            {{ category.name }}
          </NuxtLink>
          <NuxtLink
            v-if="hasMaxIngrediests"
            to="/ingredients"
            class="footer-col__item"
          >
            Всі інгредієнти
          </NuxtLink>
        </div>
      </div>

      <div class="col-lg-4">
        <h4 class="footer-col__title">Використання</h4>
        <div class="footer-col__list">
          <NuxtLink
            v-for="category of applicationsForView"
            :to="
              Boolean(category.children?.length)
                ? `/applications/${category.id}`
                : `/category/${category.id}`
            "
            class="footer-col__item"
          >
            {{ category.name }}
          </NuxtLink>
          <NuxtLink
            v-if="hasMaxApplications"
            to="/applications"
            class="footer-col__item"
          >
            Всі продукти
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="footer-copyright">
      Indel Cosmetics © Copyright 2023 - Усі права захищено
    </div>
  </footer>
</template>

<script>
const toView = (collection) => {
  if (!collection) {
    return [];
  }

  return collection.slice(0, 4).map((collection) => {
    return {
      id: collection.id,
      name: collection.attributes.Name,
      children: !collection.attributes.pod_kategoriyas?.data.length
        ? null
        : collection.attributes.pod_kategoriyas?.data.map((subcategory) => {
            return {
              id: subcategory.id,
              name: subcategory.attributes.name,
            };
          }),
    };
  });
};

export default {
  async setup() {
    try {
      const { find } = useStrapi();
      const categories = await find("categories", { populate: "*" });

      const ingredients = categories.data.filter(
        (category) => category.attributes.section === "ingredients"
      );
      const applications = categories.data.filter(
        (category) => category.attributes.section === "application"
      );

      const ingredientsForView = toView(ingredients);
      const applicationsForView = toView(applications);

      const hasMaxIngrediests = ingredients.length >= 5;
      const hasMaxApplications = applications.length >= 5;

      return {
        ingredientsForView,
        applicationsForView,
        hasMaxApplications,
        hasMaxIngrediests,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
