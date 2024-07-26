<template>
  <div class="contact-page">
    <Head>
      <Title>Indel Cosmetics Contact Us</Title>
      <Meta name="og:title" content="Indel Cosmetics Contact Us" />
    </Head>
    <div class="container">
      <AppPageBanner
        title="Зв'яжіться з нами"
        subtitle="Якщо у вас виникли запитання або ви хочете дізнатися більше про наші інгредієнти, будь ласка, не соромтеся зв’язатися з нами."
      />

      <div class="contact-content row gy-4">
        <div class="col-12 col-lg-6">
          <h4 class="contact-title">Зв'яжіться з нами</h4>
          <h5 class="contact-subtitle">Ми з нетерпінням чекаємо від вас!</h5>

          <form class="contact-form" @submit.prevent="submit">
            <div class="contact-form__row">
              <label for="name" class="form-field col-12">
                Ім'я*
                <input
                  class="form-field__input"
                  type="text"
                  id="name"
                  required
                  v-model="name"
                />
              </label>
              <label for="email" class="form-field col-12">
                Email*
                <input
                  class="form-field__input"
                  type="email"
                  id="email"
                  required
                  v-model="email"
                />
              </label>
            </div>
            <label for="message" class="form-field">
              Ваше повідомлення
              <textarea
                id="message"
                v-model="message"
                class="form-field__textarea"
              />
            </label>
            <div class="contact-form__actions">
              <AppButton variant="black">Відправити повідомлення</AppButton>
            </div>
          </form>
        </div>
        <div class="col-12 col-lg-6 contact-map">
          <div class="contact-map-label">
            <p class="contact-address">
              <b>ТОВ "Індел"</b> <br />
              Вул. М. Грушевського , 39Д <br />
              Одеса, 65031, Україна<br />
              <a href="tel:+380 50 673-27-09">Tel./fax: +380 50 673-27-09</a>
              <a href="tel:+380 95 285-88-27">Tel./fax: +380 95 285-88-27</a>
              <a href="tel:+380 48 737-33-25">Tel./fax: +380 48 737-33-25</a>
            </p>
            <p class="contact-email">
              <span class="contact-email__label">EMAIL</span><br />
              <a href="mailto:info@indel.com.ua" class="contact-email__value"
                >info@indel.com.ua</a
              >
            </p>
          </div>

          <div class="contact-map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6148.763269866758!2d30.68519790380269!3d46.48250575607405!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c63137c54e2d99%3A0x67894dd0c04e6317!2z0KHQtdGA0LLRltGB0L3QuNC5INGG0LXQvdGC0YAg0LzQvtGA0YHRjNC60L7Qs9C-INGC0LAg0YDRltGH0LrQvtCy0L7Qs9C-INGC0YDQsNC90YHQv9C-0YDRgtGD!5e0!3m2!1sru!2sua!4v1716382619597!5m2!1sru!2sua"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Micromodal from "micromodal";
import { sendEmail } from "../email";

export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },

  methods: {
    async submit() {
      try {
        // const client = useStrapiClient();
        const config = useRuntimeConfig();

        const formData = this.$data;

        await sendEmail({
          to: config.public.mailTo,
          subject: "Application from site (Contact Us)",
          html: `
            <p><b>Name</b>: ${formData.name}</p>
            <p><b>Email</b>: ${formData.email}</p>
            <p><b>Message</b>: ${formData.message}</p>
          `,
          options: {
            apiKey: config.public.sendGridApiKey,
          },
        });

        // await client("/email", {
        //   method: "POST",
        //   body: {
        //     to: config.public.mailTo,
        //     subject: "Application from site (Contact Us)",
        //     html: `
        //     <p><b>Name</b>: ${formData.name}</p>
        //     <p><b>Email</b>: ${formData.email}</p>
        //     <p><b>Message</b>: ${formData.message}</p>
        //   `,
        //   },
        // });

        Micromodal.show("success-modal");
        setTimeout(() => {
          Micromodal.close("success-modal");
        }, 5000);
      } catch (error) {
        Micromodal.show("error-modal");
        setTimeout(() => {
          Micromodal.close("error-modal");
        }, 5000);
      }
    },
  },
};
</script>
