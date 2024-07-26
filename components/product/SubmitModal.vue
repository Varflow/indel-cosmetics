<template>
  <AppModal id="submit-modal" title="Замовити взірець">
    <form class="submit-modal__form" @submit.prevent="submit">
      <label class="form-field">
        Ім'я
        <input type="text" class="form-field__input" required v-model="name" />
      </label>
      <label class="form-field">
        Email
        <input
          type="email"
          class="form-field__input"
          required
          v-model="email"
        />
      </label>
      <label class="form-field">
        Тема
        <input type="text" class="form-field__input" v-model="subject" />
      </label>
      <label class="form-field">
        Повідомлення
        <textarea class="form-field__textarea" required v-model="message" />
      </label>
      <div class="submit-modal__actions">
        <AppButton variant="black" appearence="filled"
          >Замовити взірець</AppButton
        >
      </div>
    </form>
  </AppModal>
</template>

<script>
import Micromodal from "micromodal";
import { sendEmail } from "../../email";

export default {
  props: ["title"],
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  },
  methods: {
    async submit() {
      try {
        const formData = this.$data;

        await useFetch("/api/hello", {
          body: {
            subject: "Заявка с сайта",
            html: `
            <h1>${formData.name} надіслав запит із сайту Indel Cosmetics на товар ${this.title}</h1>
            <p><b>Тема</b>: ${formData.subject}</p>
            <p><b>Email</b>: ${formData.email}</p>
            <p><b>Повідомлення</b>: ${formData.message}</p>
          `,
          },
        });

        // client("/email", {
        //   method: "POST",
        //   body: {
        //     to: config.public.mailTo,
        //     subject: "Заявка с сайта",
        //     html: `
        //     <h1>${formData.name} надіслав запит із сайту Indel Cosmetics на товар ${this.title}</h1>
        //     <p><b>Тема</b>: ${formData.subject}</p>
        //     <p><b>Email</b>: ${formData.email}</p>
        //     <p><b>Повідомлення</b>: ${formData.message}</p>
        //   `,
        //   },
        // });

        Micromodal.close("submit-modal");
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
