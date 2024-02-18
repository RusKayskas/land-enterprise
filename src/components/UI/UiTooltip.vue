<template>
  <tippy :content="content">
    <button type="button">
      <img
        svg-inline
        src="@/assets/images/icons/price/help.svg"
        alt="подробнее"
      />
    </button>
  </tippy>
</template>

<script setup>
  import { Tippy } from 'vue-tippy';

  defineProps({
    content: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="scss">
  @import 'tippy.js/dist/tippy.css';

  .tippy-box {
    text-align: center;
  }
</style>
