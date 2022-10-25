<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :class="mode" :to="to"><slot></slot></router-link>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    setToOrange: {
      type: Boolean,
      required: false
    },
    setToGreen: {
      type: Boolean,
      required: false
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }

};
</script>

<style scoped>
button, a {
  font-size: 0.9rem;
  color: #ffffff;
  background: #3d008d;
  border: none;
  border-radius: 0.2rem;
  padding: 0.3rem 0.7rem;
  margin: 0.2rem;
  transition: all 0.4s;
  cursor: pointer;
  text-decoration: none;
}
a:hover,
a:active,
button:active,
button:hover,
a.router-link-active {
  background: #6000b9;
}

.orange {
  background: #e7ac84;
  color: white;
}

.orange:hover,
.orange:active,
button.orange:active,
button.orange:hover,
a.router-link-active {
  background: #dc7c56;
  color: white;
}

.green {
  background: rgb(118, 171, 153);
}

.green:hover,
.green:active,
button.green:active,
button.green:hover,
a.router-link-active {
  background: rgb(0, 171, 114);
  color: white;
}

.disable{
  background: grey;
  cursor:not-allowed;
}
</style>
