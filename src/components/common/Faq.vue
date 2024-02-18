<template>
  <section class="faq section--padding section--padding--small-top">
    <div class="container faq-wrapper">
      <h2 class="faq__title title title--section title--margin">
        {{ $t(faq.title) }}
      </h2>
      <UiAccordion :faq="filterList(faq.list)" />
    </div>
  </section>
</template>

<script setup>
  import UiAccordion from '@/components/UI/UiAccordion.vue';
  import { filterList } from '@/helpers/filterList';
  defineProps({
    faq: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss">
  .faq {
    background: $blue-bg;
  }
</style>
