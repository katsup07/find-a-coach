<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['title', 'type'],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>
<style scoped>
.badge {
  font-size: 0.8rem;
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.3rem 1rem;
  display: inline-block;
  margin-right: 0.5rem;
  transition: all 1s;
}

.frontend {
  background-color: #376c98;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
