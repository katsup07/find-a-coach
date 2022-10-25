<template>
  <div>
    <base-card>
      <h1>Page not found</h1>
      <base-button @click="$router.back()">Go back</base-button>
    </base-card>
  </div>
</template>

<style scoped>
div {
  display: flex;
  margin-top: 0.2rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
