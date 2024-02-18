<template>
  <section class="protect section--padding">
    <div class="container protect-wrapper">
      <h2 class="protect__title title title--section">
        {{ $t(protect.title) }}
      </h2>
      <p class="protect__subtitle">{{ $t(protect.subtitle) }}</p>
      <UiButton
        tag="a"
        :id="protect.btn.id"
        :href="protect.btn.link"
        :title="$t(protect.btn.title)"
        @action="eCoommece()"
        target="_blank"
        class="protect__ui-button"
      />
    </div>
  </section>
</template>

<script setup>
  import { UiButton } from '@/components/UI';
  import TariffsDataLayer from '@/helpers/eCommerce/tariffsDataLayer';
  const dataLayer = new TariffsDataLayer();
  function eCoommece() {
    dataLayer.push();
  }
  defineProps({
    protect: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss">
  .protect {
    background: $blue-bg;
    &-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    &__title {
      margin-bottom: 10px;
    }
    &__ui-button {
      margin-top: 50px;
    }
  }
</style>
