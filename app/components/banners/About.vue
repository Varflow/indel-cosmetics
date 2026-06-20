<template>
  <div class="container">
    <div class="about-banner row g-0">
      <div class="col-lg-6">
        <img
          src="/images/banners/about.jpg"
          alt=""
          class="about-banner__image"
        />
      </div>
      <div class="col-lg-6 about-banner__content">
        <h6 class="about-banner__subtitle" v-if="texts">
          {{ texts.first_section_subtitle }}
        </h6>
        <h2 class="about-banner__title" v-if="texts">
          {{ texts.first_section_title }}
        </h2>
        <div class="about-banner__actions">
          <NuxtLink to="/company" class="link-without-decoration">
            <AppButton variant="black" v-if="texts">{{
              texts.first_section_button_text
            }}</AppButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["texts"],
};
</script>
