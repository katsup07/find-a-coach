<template>
  <div class="form">
    <form action="" @submit.prevent="submitForm">
      <div class="form-control">
        <label for="firstname">Firstname</label>
        <input
          :class="{ invalid: !firstName.isValid }"
          type="text"
          id="firstname"
          v-model.trim="firstName.val"
          @blur="setInputValid('firstName')"
        />
        <p v-if="!firstName.isValid" class="invalid-message">
          ***Fill in the above field***
        </p>
      </div>
      <div class="form-control">
        <label for="lastname">Lastname</label>
        <input
          :class="{ invalid: !lastName.isValid }"
          type="text"
          id="lastname"
          v-model.trim="lastName.val"
          @blur="setInputValid('lastName')"
        />
        <p v-if="!lastName.isValid" class="invalid-message">
          ***Fill in the above field***
        </p>
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          :class="{ invalid: !description.isValid }"
          type="text"
          id="description"
          rows="5"
          v-model.trim="description.val"
          @blur="setInputValid('description')"
        />
        <p v-if="!description.isValid" class="invalid-message">
          ***Fill in the above field***
        </p>
      </div>
      <div class="form-control">
        <label for="rate">Hourly Rate</label>
        <input
          :class="{ invalid: !rate.isValid }"
          type="number"
          id="rate"
          v-model.number="rate.val"
          @blur="setInputValid('rate')"
        />
        <p v-if="!rate.isValid" class="invalid-message">
          ***Rate must be greater than zero***
        </p>
      </div>
      <div class="form-control">
        <h3>Areas of Expertise</h3>
        <div>
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            v-model="areas.val"
            @change="setInputValid('areas')"
          />
          <label for="frontend">Frontend Development</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="backend"
            value="backend"
            v-model="areas.val"
            @change="setInputValid('areas')"
          />
          <label for="backend">Backend Development</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="career"
            value="career"
            v-model="areas.val"
            @change="setInputValid('areas')"
          />
          <label for="career">Career Advisory</label>
          <p v-if="!areas.isValid" class="invalid-message">
            ***Check one of the above fields***
          </p>
        </div>
      </div>
      <p v-if="!formIsValid">Please fix the errors and try again.</p>
      <base-button>Register</base-button>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['saveData'],
  data() {
    return {
      firstName: { val: '', isValid: true },
      lastName: { val: '', isValid: true },
      description: { val: '', isValid: true },
      rate: { val: null, isValid: true },
      areas: { val: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    setInputValid(dataType) {
      this[dataType].isValid = true;
    },
    setInputAndFormInvalid(dataType) {
      this[dataType].isValid = false;
      this.formIsValid = false;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') this.setInputAndFormInvalid('firstName');
      if (this.lastName.val === '') this.setInputAndFormInvalid('lastName');
      if (this.description.val === '')
        this.setInputAndFormInvalid('description');
      if (!this.rate.val || this.rate.val < 0)
        this.setInputAndFormInvalid('rate');
      if (this.areas.val.length === 0) this.setInputAndFormInvalid('areas');
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return console.log('Form is invalid!');

      console.log(this.formIsValid);
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      console.log('submitting form...', formData);
      this.$emit('saveData', formData);
    },
  },
};
</script>
<style scoped>
.form {
  width: 100%;
}
.form-control {
  margin: 0.5rem 0;
}

form {
  padding: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid rgb(222, 168, 168);
}

.invalid {
  background: rgb(239, 211, 211);
  border: 0.01px solid red;
}

.invalid-message {
  font-size: 0.2rem;
}
</style>
