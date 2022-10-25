<template>
  <div class="card"><slot></slot></div>
</template>

<style scoped>
.card {
  margin: 0.1rem 1rem;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.3rem 0.2rem rgb(224, 224, 224);
  background: #f8f8ff;
  max-width: 50rem;
  min-width: 30rem;
}
</style>
