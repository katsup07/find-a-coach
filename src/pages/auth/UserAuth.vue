<template>
  <form action="" @submit.prevent="submitForm">
    <base-card>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>

      <p class="error" v-if="!formIsValid">
        Please enter a valid email and password(at least 6 characters long).
      </p>
      <base-dialog @close="errorHandler" title="Error" :show="!!error">
        <p class="error">{{ error }}</p>
      </base-dialog>
      <base-dialog :show="isLoading" title="Sending Data">
      Sending data for authentication...
        <base-spinner></base-spinner>
      </base-dialog>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchModeButtonCaption
      }}</base-button>
    </base-card>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Sign-up';
    },
    switchModeButtonCaption() {
      return this.mode === 'login'
        ? '<< Switch to Sign-up'
        : '<< Switch to Login';
    },
  },
  methods: {
    validate() {
      return (this.formIsValid =
        this.email.includes('@') && this.password.length >= 6);
    },

    async submitForm() {
      if (!this.validate()) return;

      // else send http request
      this.isLoading = true;
      this.error = false;
      const actionPayload = { email: this.email, password: this.password };

      try {
        if (this.mode === 'login')
            await this.$store.dispatch('login', actionPayload);
        if (this.mode === 'signup') {
           await this.$store.dispatch('signup', actionPayload);
        }
        if(this.$route.query.redirect === 'register')// defined 'redirect=register' key: value by using query param in CoachesList
          this.$router.replace('/register');
        else
          this.$router.replace('/coaches');

      } catch (err) {
        this.error = err.message || 'Failed to authenticate';
      } finally {
        this.isLoading = false;
      }
    },

    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    },
    errorHandler() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  margin: 1rem;
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

.error {
  color: red;
  font-size: 0.7rem;
}
</style>
