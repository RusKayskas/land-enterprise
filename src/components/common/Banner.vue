<template>
  <section class="banner s-gradient">
    <div class="container banner__content">
      <div class="banner__text">
        <h1
          :class="[
            'banner__title title title--big',
            { 'banner__title--en': localeAddClass },
          ]"
        >
          {{ $t(banner.title) }}
        </h1>
        <p class="banner__subtitle title">{{ $t(banner.subTitle) }}</p>
        <UiList :list="banner.list" class="banner__list" />
        <UiButton
          tag="a"
          :id="banner.btn.id"
          :title="$t(banner.btn.title)"
          class="banner__ui-button"
          @action="orderProduct()"
        />
      </div>
      <div class="banner__img">
        <img
          :src="require(`@/assets/images/${banner.img}`)"
          :alt="banner.title"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { UiButton, UiList } from '@/components/UI';
  import { computed } from 'vue';
  import TariffsDataLayer from '@/helpers/eCommerce/tariffsDataLayer';
  const dataLayer = new TariffsDataLayer();
  import { $i18n } from '@/main';
  const locale = $i18n.value.global.locale;
  const localeAddClass = computed(() => {
    return locale === 'en';
  });

  function eCoommece() {
    dataLayer.push();
  }
  defineProps({
    banner: {
      type: Object,
      required: true,
    },
  });
  import { createdCookieWizard } from '@/mixins/createCookie.js';
  import { ecommerceData } from '@/page/enterprise/data.json';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const domain = 'https://my.ddos-guard.net/dashboard';
  let coupon = 'NOVEMBER15';
  const orderProduct = () => {
    createdCookieWizard(t(ecommerceData.currency), ecommerceData.id, coupon);
    eCoommece();
    window.open(domain, '_blank');
  };
</script>

<style lang="scss">
  .banner {
    padding: 0;
    &.s-gradient {
      &::before {
        width: 489px;
        filter: blur(90px);
        top: 25%;
        height: 326px;
        opacity: 0.7;
        @include media-sm-min {
          width: 661px;
          height: 440px;
          opacity: 1;
          filter: blur(140px);
          top: -239px;
        }
      }
    }
    .container {
      padding: 60px 15px 0;
      overflow: hidden;
      @include media-sm-min {
        padding: 120px 15px;
      }
    }
    &__content {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      justify-content: center;
      @include media-sm-min {
        justify-content: flex-start;
      }
    }
    &__title {
      text-align: center;
      margin-bottom: 10px;
      @include media-xs-min {
        margin-bottom: 15px;
      }
      @include media-sm-min {
        line-height: 60px;
        text-align: left;
        max-width: 450px;
      }
      &--en {
        @include media-sm-min {
          max-width: 700px;
        }
      }
    }
    &__text {
      display: flex;
      position: relative;
      z-index: 2;
      flex-direction: column;
      align-items: center;
      margin-bottom: 50px;
      @include media-sm-min {
        margin-bottom: 0;
        max-width: 635px;
        align-items: flex-start;
      }
    }
    &__subtitle {
      @include text(h3, normal, extrabold);
    }
    &__list {
      margin-top: 30px;
      @include media-xs-min {
        margin-top: 40px;
      }
      @include media-sm-min {
        font-size: 45px;
        line-height: 60px;
        text-align: left;
      }
      .ui-list__item {
        text-align: center;
        justify-content: center;
        @include media-sm-min {
          justify-content: flex-start;
        }
        &::before {
          margin-right: 0;
          @include media-sm-min {
            margin-right: 15px;
          }
        }
      }
    }
    &__ui-button {
      margin-top: 30px;
      @include media-xs-min {
        margin-top: 40px;
      }
      @include media-sm-min {
        margin-top: 50px;
      }
    }
    &__img {
      @include media-sm-min {
        position: absolute;
        width: calc(100% - 430px);
        top: 50%;
        right: -6.4%;
        transform: translateY(-46%);
      }
    }
  }
</style>
