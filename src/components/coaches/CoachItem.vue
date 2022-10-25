<template>
  <li class="main-list">
    <h2>{{ fullName }}</h2>
    <p><span class="bold">Description:</span> {{ description }}</p>
    <span class="bold">Expertise:</span>
    <ul>
      <base-badge
        v-for="area in areas"
        :key="id + area"
        :title="area"
        :type="area"
      ></base-badge>
    </ul>
    <div><span class="bold">Rate: </span>${{ rate }}/hour</div>
    <div class="actions">
      <base-button :link="true" :to="coachContactLink">Contact</base-button> <!-- same as 'coaches/'+ this.id + '/contact'" -->
      <base-button :link="true" :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'description', 'areas', 'rate', 'id'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return `${this.$route.path}/${this.id}/contact`; // coaches/id/contact
    },
    coachDetailsLink() {
      return `${this.$route.path}/${this.id}`; // coaches/id
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  margin-top: 0.5rem;
}

li,
p,
ul,
h2 {
  margin: 0.1rem;
}

.main-list {
  margin-bottom: 1rem;
  border-bottom: 0.1px solid rgb(182, 182, 182);
  padding-bottom: 1rem;
}

.bold {
  font-weight: 600;
}

.actions {
  display: inline-flex;
}
</style>
