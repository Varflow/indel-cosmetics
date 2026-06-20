<template>
  <div class="company-page">
    <Head>
      <Title>Indel Cosmetics About Company</Title>
      <Meta name="og:title" content="Indel Cosmetics About Company" />
      <Meta
        name="og:description"
        content="Indel Cosmetics OÜ is an international company engaged in distribution of
            special and unique chemicals for production of personal care and
            cosmetics."
      />
      <Meta name="og:image" content="/images/banners/company.js" />
    </Head>
    <div class="company-banner">
      <img
        src="/images/banners/company.jpg"
        alt=""
        class="company-banner__image"
      />
      <h2 class="company-banner__title" v-if="companyInfo">
        {{ companyInfo.title }}
      </h2>
    </div>

    <div class="container">
      <div class="row company-content-item">
        <div
          class="col-12 col-lg-6 company-content__image"
          data-aos="fade-right"
        >
          <img src="/images/banners/company/company-1.jpeg" alt="" />
        </div>

        <div class="col-12 col-lg-6 company-content__info" data-aos="fade-left">
          <h3 class="company-content__title" v-if="companyInfo">
            {{ companyInfo.first_block_title }}
          </h3>
          <p
            class="company-content__text"
            v-if="companyInfo"
            v-html="companyInfo.first_block_text"
          ></p>
        </div>
      </div>

      <div class="row flex-row-reverse company-content-item">
        <div
          class="col-12 col-lg-6 company-content__image"
          data-aos="fade-left"
        >
          <img src="/images/banners/company/company-2.jpg" alt="" />
        </div>

        <div
          class="col-12 col-lg-6 company-content__info"
          data-aos="fade-right"
        >
          <h3 class="company-content__title" v-if="companyInfo">
            {{ companyInfo.second_block_title }}
          </h3>
          <p
            class="company-content__text"
            v-if="companyInfo"
            v-html="companyInfo.second_block_text"
          ></p>
        </div>
      </div>

      <div class="row company-content-item">
        <div
          class="col-12 col-lg-6 company-content__image"
          data-aos="fade-right"
        >
          <img src="/images/banners/company/company-3.jpg" alt="" />
        </div>

        <div class="col-12 col-lg-6 company-content__info" data-aos="fade-left">
          <h3 class="company-content__title" v-if="companyInfo">
            {{ companyInfo.third_block_title }}
          </h3>
          <p
            class="company-content__text"
            v-if="companyInfo"
            v-html="companyInfo.third_block_text"
          ></p>
        </div>
      </div>
    </div>

    <div class="section-team">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" v-if="companyInfo">{{ companyInfo.our_team_title }}</h2>
        </div>

        <div class="row team-list gy-5">
          <div class="col-lg-4 team-item" v-for="member of team">
            <div class="team-item__avatar">
              <img :src="member.avatar" alt="" />
            </div>
            <h4 class="team-item__name">{{ member.name }}</h4>
            <h5 class="team-item__post">{{ member.position }}</h5>
          </div>
          <!-- <div class="col-lg-4 team-item">
            <div class="team-item__avatar">
              <img src="/images/team/team-2.png" alt="" />
            </div>
            <h4 class="team-item__name">Ms. Hriaznova Veronika</h4>
            <h5 class="team-item__post">Ceo</h5>
          </div>
          <div class="col-lg-4 team-item">
            <div class="team-item__avatar">
              <img src="/images/team/team-3.png" alt="" />
            </div>
            <h4 class="team-item__name">Ms. Makarova Lubov</h4>
            <h5 class="team-item__post">SALES MANAGER</h5>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AOS from "aos";
import "aos/dist/aos.css";

const { companyInfo, team } = await useCompanyInfo();

onMounted(() => {
  AOS.init({ duration: 1000 });
});
</script>
