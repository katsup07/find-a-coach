<template>
  <section>
    <base-card>
      <base-dialog title="Error" :show="!!error" @close="closeHandler">
        <p>Something went wrong.{{ error }}</p>
      </base-dialog>
      <header>
      </header>
      <div class="loading-spinner" v-if="isLoading"><base-spinner></base-spinner>Loading...</div>
      <div v-else-if="hasRequests && !isLoading">
        <h2>Requests Received</h2>
        <ul>
          <request-item
            v-for="request in receivedRequests"
            :key="request.id"
            :message="request.message"
            :email="request.userEmail"
          ></request-item>
        </ul>
      </div>
      <h2 v-else>You currently have no requests.</h2>
    </base-card>
  </section>
</template>
<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/getRequests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
    setRequests() {
      return this.$store.dispatch('requests/fetchRequests');
    },
  },
  methods: {
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Something failed.';
      } finally {
        this.isLoading = false;
      }
    },
    closeHandler() {
      console.log('closeHandler()');
      this.error = false;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>
<style scoped>
section {
  display: flex;
  justify-content: center;
  margin: 0.5rem;
}
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0.5rem auto;
  padding: 0;
  max-width: 20rem;
}

h3 {
  text-align: center;
}

.bold {
  font-weight: bold;
}

.loading-spinner{
  text-align: center;
}
</style>
