<template>
  <v-container tag="section" v-bind="$attrs" v-on="$listeners" fluid>
    <slot />
  </v-container>
</template>

<script>
export default {
  name: 'CoreView',
};
</script>
