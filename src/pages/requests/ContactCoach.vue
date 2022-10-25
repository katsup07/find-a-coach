<template>
    <div class="container">
      <base-dialog
        :show="isSent"
        title="Request Sent"
        @close="closeHandler"
      >Your request was successfully sent!</base-dialog>
      <base-dialog
        :show="!!error"
        title="Error"
        @close="closeHandler"
      >Something went wrong. {{error}}</base-dialog>
        <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea rows="5" id="message" v-model.trim="message"></textarea>
      </div>
      <div class="actions">
        <p class="errors" v-if="!formIsValid">
          Form is invalid. Please ensure both fields are properly filled out.
        </p>
        <p v-if="!!error">{{ error }}</p>
        <base-button>Send Message</base-button>
      </div>
        </form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
      error: null,
      isSent: false,
    };
  },
  methods: {
    validate() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.message === '')
        this.formIsValid = false;
    },
    async submitForm() {
      const request = {
        email: this.email,
        message: this.message,
        coachId: this.$route.params.id,
      };

      this.validate();
      if (!this.formIsValid) return console.log('invalid form...!');

      try {
        this.isSent = false;
        await this.$store.dispatch('requests/contactCoach', request);
        this.isSent = true;
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
    closeHandler() {
      if (this.error) this.error = null;
      if (this.isSent) this.isSent = false;
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
