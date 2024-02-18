<template>
  <section
    id="partners"
    class="partners section--padding section--padding--small-top"
  >
    <div class="container">
      <h2 class="partners__title title title--section title--margin">
        {{ $t(partners.title) }}
      </h2>
      <div
        :class="['partners__cards', { 'partners__card--en': localeAddClass }]"
      >
        <div
          v-for="(partner, index) in filterList(partners.cards)"
          :key="index"
          class="partners__cards-item"
        >
          <img
            :src="require(`@/assets/images/${$t(partner.img)}`)"
            :alt="$t(partner.alt)"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue';
  import { $i18n } from '@/main';
  import { filterList } from '@/helpers/filterList';
  defineProps({
    partners: {
      type: Object,
      required: true,
    },
  });
  const locale = $i18n.value.global.locale;
  const localeAddClass = computed(() => {
    return locale === 'en';
  });
</script>

<style lang="scss">
  .partners {
    background: $blue-bg;
    &__title {
      margin-bottom: 40px;
      @include media-xs-min {
        margin-bottom: 50px;
      }
      @include media-sm-min {
        margin-bottom: 80px;
      }
    }
    &__cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      grid-gap: 15px;
      @include media-sm-min {
        grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
        grid-gap: 30px;
      }
      &-item {
        background-color: $white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        height: 90px;
      }
    }
  }
  .partners__cards.partners__card--en {
    @include media-sm-min {
      grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
    }
  }
</style>
