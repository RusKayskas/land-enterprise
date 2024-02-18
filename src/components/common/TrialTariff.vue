<template>
  <section id="tariff" class="tariff s-gradient">
    <div
      :class="[
        'container',
        'tariff-wrapper',
        { 'tariff-wrapper--flex': locale('en') },
      ]"
    >
      <div class="tariff__text">
        <h2
          class="tariff__text-title title title--big"
          v-html="$t(tariff.title)"
        ></h2>
        <p class="tariff__text-details">{{ $t(tariff.details) }}</p>
      </div>
      <div class="tarff__trial trial" v-if="locale('ru')">
        <img
          class="trial__icon"
          svg-inline
          src="@/assets/images/icons/trial/trial.svg"
          alt=""
        />
        <span class="trial__title title">{{ trial.title }}</span>
        <p class="trial__details">
          {{ trial.details }}
        </p>
        <UiButton
          :title="trial.btn.text"
          class="ui-button ui-button--white"
          @action="feedBackFormModal.open()"
        />
      </div>
      <div
        v-for="(tarif, index) in tariff.plan"
        :key="index"
        class="tariff__card tariff__card--grid"
      >
        <div class="tariff__card-head">
          <h3 class="tariff__card-title title">{{ $t(tarif.title) }}</h3>
          <div class="tariff__card-price">
            <div class="tariff__card-price-top">
              <span class="tariff__card-price-number">
                {{ $t(tarif.price) }}
              </span>
              <sup class="tariff__card-price-sup" v-if="locale('ru')">
                <UiTooltip :content="tariff.tooltipContent" />
              </sup>
            </div>
            <span class="tariff__card-price-month">{{ $t(tarif.month) }}</span>
          </div>
        </div>
        <UiList
          :list="tarif.options"
          type="success"
          class="tariff__card-list"
        />

        <UiButton
          tag="a"
          :id="tarif.btn.id"
          :title="$t(tarif.btn.title)"
          class="section-tariff__card-ui-button"
          @action="orderProduct()"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
  import { $i18n } from '@/main';
  import { UiButton, UiList, UiTooltip } from '@/components/UI';
  import TariffsDataLayer from '@/helpers/eCommerce/tariffsDataLayer';
  import { trialForm, trial } from '@/page/enterprise/data';
  const locale = (value) => {
    return $i18n.value.global.locale === value;
  };
  const dataLayer = new TariffsDataLayer();
  function eCoommece() {
    dataLayer.push();
  }
  defineProps({
    tariff: {
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
  import { useModalSlot } from 'vue-final-modal';
  import FeedbackForm from '@/components/common/FeedBackForm/index.vue';
  import { createModal } from '@/services/createModal';
  const feedBackFormModal = createModal(FeedbackForm, trialForm.title);
  feedBackFormModal.patchOptions({
    slots: {
      default: useModalSlot({
        attrs: {
          isDefaultForm: false,
          id: trialForm.id,
          buttonId: trialForm.btnId,
          textareaId: trialForm.inputs.textarea.id,
          onConfirm() {
            feedBackFormModal.close();
          },
        },
      }),
    },
  });
</script>

<style lang="scss">
  .tariff {
    padding: 60px 0;
    @include media-xs-min {
      padding: 80px 0;
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        &--flex {
          display: flex;
          align-items: center;
          .tariff__text-title {
            margin-top: 0;
          }
        }
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
          margin-top: 80px;
        }
        br {
          display: none;
          @include media-sm-min {
            display: block;
          }
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
      &--grid {
        grid-column-start: 2;
        grid-row-start: 1;
        grid-row-end: 4;
      }
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
        max-width: 300px;
        justify-content: space-around;
        &-top {
          display: flex;
          align-items: center;
          font-family: $title-font;
          @include text(h4, normal, normal);
          line-height: 1;
          @include media-sm-min {
            font-size: 30px;
          }
        }
        &-sup {
          margin-left: -5px;
        }
        &-number {
          margin-right: 10px;
        }
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
  .trial {
    color: $white;
    order: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @include media-xs-min {
      @include text(paragraph, normal, bold);
    }
    @include media-sm-min {
      background: $blue-dark;
      align-items: flex-start;
      padding: 30px;
      border-radius: 30px;
    }
    &__icon {
      display: none;
      @include media-sm-min {
        display: block;
        margin-bottom: 20px;
      }
    }
    &__title {
      @include text(paragraph, small, bold);
      margin-bottom: 5px;
      @include media-xs-min {
        @include text(paragraph, normal, bold);
        margin-bottom: 20px;
      }
      @include media-sm-min {
        text-align: left;
        @include text(paragraph, large, bold);
      }
    }
    &__details {
      color: $mono-lables;
      @include text(paragraph, small, normal);
      margin-bottom: 20px;
      @include media-sm-min {
        max-width: 450px;
        text-align: left;
        @include text(paragraph, normal, normal);
        line-height: 25px;
      }
    }
  }
</style>
