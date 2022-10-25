<template>
  <div class="content">
    <section>
      <base-card>
        <h2>Register as a coach now</h2>
        <coach-form @saveData="saveDataHandler"></coach-form>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveDataHandler(data) {
      console.log('saveDataHandler...', data);
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
section {
  padding: 1rem 1rem;
  display: flex;
  justify-content: center;
}
section h2 {
  text-align: center;
}
</style>
