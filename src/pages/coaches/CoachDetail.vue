<template>
  <div class="container">
    <section>
      <base-card>
        <h2>{{ fullname }}</h2>
        <h3>${{ rate }}/hr</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area">
          <p>{{ description }}</p></base-badge
        ></base-card
      >
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullname() {
      return (this.selectedCoach.firstName + this.selectedCoach.lastName) || 'error in CoachDetail';
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    contactLink() {
      return this.$route.path + '/contact' ;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  // life-cycle hook
  created() {
    this.selectedCoach = this.$store.getters['coaches/getCoaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
<style scoped>
.container{
  width: 100%;
  margin: 0.1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
