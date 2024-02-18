<template>
  <section class="personal section--padding section--padding--small">
    <div class="container personal-wrapper">
      <h2 class="personal__title title title--section title--margin">
        {{ $t(personal.title) }}
      </h2>
      <Carousel3d
        :clickable="true"
        :controlsVisible="true"
        :controls="true"
        display="3"
        :border="0"
        :width="850"
        :height="570"
        :space="250"
        :perspective="0"
        :controls-prev-html="`<img src='${arrowPrev}' />`"
        :controls-next-html="`<img src='${arrowNext}' />`"
        :controls-width="45"
        :controls-height="45"
        :inverse-scaling="300"
        ref="personalSlider"
        :count="personal.list.length"
        @after-slide-change="
          changeActive(personalText, 'personal__slide-text--is-active'),
            changeActive(personalDots, 'slider__pagination-dot--is-active')
        "
        class="personal__slider"
      >
        <slide
          v-for="(slide, index) in personal.list"
          :index="index"
          :key="index"
          class="personal__slide"
        >
          <div class="personal__slide-img-wrapper">
            <img
              :src="require(`@/assets/images/personal/${$t(slide.img.src)}`)"
              :alt="slide.title"
            />
          </div>
        </slide>
      </Carousel3d>
      <div
        ref="personalText"
        v-for="(slide, index) in personal.list"
        :key="index"
        class="personal__slide-text"
      >
        <p class="title">
          {{ $t(slide.title) }}
        </p>
        <p class="details">
          {{ $t(slide.details) }}
        </p>
        <UiButton
          tag="a"
          :id="personal.btn.id"
          :title="$t(personal.btn.text)"
          class="personal__slide-button"
          @action="orderProduct()"
        />
      </div>
      <div class="slider__pagination">
        <button
          ref="personalDots"
          class="slider__pagination-dot"
          v-for="(item, index) in personal.list"
          :key="index"
          @click="goToSlide(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { Carousel3d, Slide } from 'vue3-carousel-3d';
  import { ref, onMounted } from 'vue';
  import { UiButton } from '@/components/UI';
  import TariffsDataLayer from '@/helpers/eCommerce/tariffsDataLayer';
  defineProps({
    personal: {
      type: Object,
      required: true,
    },
  });
  const dataLayer = new TariffsDataLayer();
  function eCoommece() {
    dataLayer.push();
  }
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
  const personalSlider = ref();
  const personalText = ref();
  const personalDots = ref();
  function goToSlide(index) {
    personalSlider.value.goSlide(index);
    changeActive(personalText.value, 'personal__slide-text--is-active');
    changeActive(personalDots.value, 'slider__pagination-dot--is-active');
  }
  const changeActive = (element, isActiveClass) => {
    element.forEach((item, index) => {
      personalSlider.value.currentIndex === index
        ? item.classList.add(isActiveClass)
        : item.classList.remove(isActiveClass);
    });
  };

  onMounted(() => {
    changeActive(personalText.value, 'personal__slide-text--is-active');
    changeActive(personalDots.value, 'slider__pagination-dot--is-active');
  });
  const arrowPrev = require(`@/assets/images/icons/slider/arrLeft.svg`);
  const arrowNext = require(`@/assets/images/icons/slider/arrRight.svg`);
</script>
<style lang="scss">
  .personal {
    background: $blue-bg;
    overflow: hidden;
    &-wrapper {
      transition: linear 0.2s;
    }
    &__slider {
      margin: 0 !important;
      max-width: 100%;
    }
    &__slide {
      &-img-wrapper {
        padding: 0 35px 25px;
        @include media-xs-min {
          padding: 0px 65px 30px;
        }
        @include media-sm-min {
          padding: 0 40px 40px;
        }
      }
      &-text {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0 35px;
        opacity: 0;
        height: 0;
        overflow: hidden;
        z-index: -1;
        &--is-active {
          opacity: 1;
          height: fit-content;
          z-index: 999;
        }
        .title {
          @include text(paragraph, normal, bold);
          margin-bottom: 5px;
          @include media-mb-min {
            @include text(paragraph, large, bold);
            line-height: 25px;
          }
          @include media-sm-min {
            @include text(paragraph, exraLarge, bold);
            margin-bottom: 10px;
          }
        }
        .details {
          @include text(paragraph, normal, bold);
          line-height: 25px;
          @include media-sm-min {
            @include text(paragraph, large, bold);
          }
        }
      }
      &-button {
        margin-top: 20px;
        padding: 10px 20px;
      }
    }
  }
  .carousel-3d-container {
    @include media-mb-min {
      max-height: 450px;
    }
    @include media-sm-min {
      max-height: 100%;
    }
    .carousel-3d-slider {
      .carousel-3d-slide {
        opacity: 0 !important;
        background-color: inherit;
        @include media-sm-min {
          opacity: 0.5 !important;
        }
        .personal__slide-text {
          opacity: 0 !important;
        }
        &.current {
          opacity: 1 !important;
          .personal__slide-img-wrapper {
            overflow: hidden;
            img {
              border-radius: 15px;
              height: 100%;
              object-fit: fill;
              box-shadow: 0px 15px 15px 0px rgba(47, 74, 116, 0.25);
              @include media-mb-min {
                height: 100%;
                max-height: 420px;
                box-shadow: 0px 15px 30px 0px rgba(47, 74, 116, 0.25);
              }
              @include media-sm-min {
                max-height: 530px;
              }
            }
          }
          .personal__slide-text {
            opacity: 1 !important;
          }
        }
      }
    }
    .carousel-3d-controls {
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        width: 25px !important;
        @include media-sm-min {
          width: 45px !important;
          border: 1px solid $blue-main;
        }
        @media (hover: hover) {
          img {
            transition: all 0.4s linear;
          }
          &:hover {
            background: $blue-hover;
            opacity: 1;
            img {
              filter: brightness(0) invert(1);
            }
          }
        }
        &.prev {
          left: 0px;
        }
        &.next {
          right: 0px;
        }
        span {
          display: flex;
          width: 25px;
          align-items: center;
          justify-content: center;
          height: 25px;
        }
      }
    }
  }
</style>
