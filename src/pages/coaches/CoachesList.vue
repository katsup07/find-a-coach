<template>
  <div>
    <base-dialog :show="!!error" title="Error" @close="closeHandler">
      <p>{{ error }}</p>
    </base-dialog>
    <section><coach-filter @changeFilter="setFilters"></coach-filter></section>
    <section>
      <base-card class="card">
        <div class="controls">
          <base-button :mode="'orange'" @click="loadCoaches(true)">Refresh</base-button>
          <base-button
            :mode="'green'"
            :link="true"
            to="/register"
            v-if="!isCoach && !isLoading"
            >Register as Coach</base-button
          >
        </div>
        <div class="coach-cards">
          <div v-if="isLoading"><base-spinner></base-spinner>Loading...</div>
          <ul v-else-if="hasCoaches">
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :firstName="coach.firstName"
              :lastName="coach.lastName"
              :description="coach.description"
              :areas="coach.areas"
              :rate="coach.hourlyRate"
            ></coach-item>
          </ul>
          <h2 v-else>There are currently no coaches to display</h2>
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      forceRefresh: false,
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/getCoaches']; // since namespaced, so access via "[namespace_name / getter_name]"
      const filtered = coaches.filter((coach) => {
        const areas = coach.areas;
        if (this.activeFilters.frontend && areas.includes('frontend'))
          return areas;
        if (this.activeFilters.backend && areas.includes('backend'))
          return areas;
        if (this.activeFilters.career && areas.includes('career')) return areas;

        //else
        return false;
      });

      return filtered;
    },

    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    closeHandler() {
      this.error = null;
    },
    async loadCoaches(refresh = false) {
      this.forceRefresh = refresh;
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches',{forceRefresh: this.forceRefresh});
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || 'Something went wrong.';
      }
    },
  },
};
</script>

<style scoped>
section {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.coach-cards {
  display: flex;
  justify-content: center;
  margin-top: 0;
  margin-bottom: 0;
}

.card {
  padding: 0.1rem 1.5rem 1.5rem 1.5rem;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
