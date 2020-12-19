<template>
  <layout-base>
    <router-view name="appBar" />
  </layout-base>
</template>

<script>
import LayoutBase from '../base/Index.vue';

export default {
  name: 'LayoutDefault',

  components: {
    LayoutBase,
  },
};
</script>
