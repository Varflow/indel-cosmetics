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
        <img :src="slide.image ?? ''" alt="Banner 1" class="main-banner__image" />
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

<script setup lang="ts">
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Pagination, Navigation, Autoplay];
const { slides } = await useMainSlides();
</script>
