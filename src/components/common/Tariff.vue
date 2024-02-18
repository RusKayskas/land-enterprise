<template>
  <section id="tariff" class="tariff s-gradient">
    <div class="container tariff-wrapper">
      <div class="tariff__text">
        <h2 class="tariff__text-title title title--big">
          {{ $t(tariff.title) }}
        </h2>
        <p class="tariff__text-details">{{ $t(tariff.details) }}</p>
      </div>
      <div
        v-for="(tarif, index) in tariff.plan"
        :key="index"
        class="tariff__card"
      >
        <div class="tariff__card-head">
          <h3 class="tariff__card-title title">{{ $t(tarif.title) }}</h3>
          <div class="tariff__card-price">
            <div class="tariff__card-price-top">
              <span>{{ $t(tarif.price) }}</span>
              <sup class="tariff__card-price-sup" v-if="locale === 'ru'">
                <UiTooltip :content="tariff.tooltipContent" />
              </sup>
            </div>
            <span class="text">{{ $t(tarif.month) }}</span>
          </div>
        </div>

        <UiList
          :list="tarif.options"
          type="success"
          class="tariff__card-list"
        />

        <UiButton
          tag="a"
          @action="eCoommece()"
          :id="tarif.btn.id"
          :href="tarif.btn.link"
          :title="$t(tarif.btn.title)"
          target="_blank"
          class="section-tariff__card-ui-button"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
  import { $i18n } from '@/main';
  import { UiButton, UiList, UiTooltip } from '@/components/UI';
  const locale = $i18n.value.global.locale;
  defineProps({
    tariff: {
      type: Object,
      required: true,
    },
  });
  import TariffsDataLayer from '@/helpers/eCommerce/tariffsDataLayer';
  const dataLayer = new TariffsDataLayer();
  function eCoommece() {
    dataLayer.push();
  }
</script>

<style lang="scss">
  .tariff {
    padding: 60px 0;
    @include media-xs-min {
      padding: 80px 0;
    }
    @include media-sm-min {
      padding: 100px 0;
    }
    &.s-gradient {
      &::before {
        display: none;
        @include media-xs-min {
          display: block;
          width: 787px;
          height: 690px;
          filter: blur(100px);
          border-radius: 787px;
          top: 15%;
        }
        @include media-sm-min {
          display: block;
          top: auto;
          width: 935px;
          height: 822px;
          bottom: -470px;
          border-radius: 935px;
          filter: blur(200px);
        }
      }
    }
    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 40px 50px;
      @include media-xs-min {
        gap: 50px;
      }
      @include media-sm-min {
        gap: 50px 60px;
      }
    }
    &__text {
      max-width: 525px;
      width: 100%;
      &-title {
        margin-bottom: 10px;
        text-align: center;
        @include media-sm-min {
          text-align: left;
          margin-bottom: 20px;
        }
      }
      &-details {
        font-size: 15px;
        font-weight: 600;
        line-height: 20px;
        text-align: center;
        font-family: $title-font;
        @include media-sm-min {
          text-align: left;
          font-size: 20px;
          line-height: 30px;
        }
      }
    }
    &__card {
      background: $white;
      max-width: 525px;
      flex: 1;
      min-width: 100%;
      border-radius: 20px;
      color: $white-gray;
      padding: 20px;
      @include media-xs-min {
        min-width: 400px;
        width: 100%;
        padding: 30px 40px 40px;
      }
      @include media-sm-min {
        padding: 40px 50px 50px;
        border-radius: 30px;
      }
      &-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-bottom: 15px;
        border-bottom: 1px solid $mono-border;
        margin-bottom: 20px;
        @include media-xs-min {
          padding-bottom: 20px;
        }
        @include media-sm-min {
          margin-bottom: 25px;
        }
      }
      &-title {
        @include text(paragraph, large, bold);
        margin-bottom: 10px;
        @include media-xs-min {
          @include text(paragraph, exraLarge, bold);
        }
        @include media-sm-min {
          @include text(paragraph, big, bold);
          margin-bottom: 15px;
        }
      }
      &-price {
        font-weight: 600;
        color: $blue-main;
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        max-width: 260px;
        justify-content: space-around;
        &-top {
          display: flex;
          align-items: center;
          font-family: $title-font;
          @include text(h4, normal, normal);
          @include media-sm-min {
            font-size: 30px;
          }
          & > * {
            &:not(:last-child) {
              margin-right: 10px;
            }
          }
        }
        &-sup {
          margin-left: -5px;
        }
      }
      .text {
        padding: 0 10px;
      }
      &-list {
        margin-bottom: 20px;
        @include media-xs-min {
          margin-bottom: 30px;
        }
        @include media-sm-min {
          margin-bottom: 40px;
        }
      }
      &-ui-button {
        width: 100%;
      }
    }
  }
</style>
