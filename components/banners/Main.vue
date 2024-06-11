<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="0"
    :speed="1200"
    :delay="4000"
    :autoplay="true"
    class="main-slider"
    navigation
    pagination
  >
    <swiper-slide v-for="slide in slides" :key="slide.id">
      <div class="main-banner">
        <img :src="slide.image" alt="Banner 1" class="main-banner__image" />
        <h2 class="main-banner__title">
          {{ slide.title }}
        </h2>
        <h3 class="main-banner__subtitle" v-if="slide.description">
          {{ slide.description }}
        </h3>
        <div class="main-banner__actions">
          <NuxtLink :to="slide.link" class="link-without-decoration">
            <AppButton variant="white"> {{ slide.button_text }} </AppButton>
          </NuxtLink>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import orderby from "lodash.orderby";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const modules = [Pagination, Navigation, Autoplay];

    return { modules };
  },

  data() {
    return {
      slides: [],
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const media = useStrapiMedia();
      const { find } = useStrapi();

      const banners = await find("slajder-glavnayas", {
        populate: {
          image: "*",
        },
      });

      const slides = banners.data.map((banner) => {
        return {
          ...banner.attributes,
          image: `${media}${banner.attributes.image.data?.attributes?.url}`,
        };
      });

      const orderedSlides = orderby(slides, ["order"], ["asc"]);

      this.loading = false;
      this.slides = orderedSlides;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
