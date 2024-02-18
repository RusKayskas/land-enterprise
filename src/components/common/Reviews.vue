<template>
  <section id="reviews" class="reviews section--padding">
    <div class="container">
      <h2 class="reviews__title title title--section">
        {{ $t(reviews.title) }}
      </h2>
      <p class="reviews__subtitle" v-if="locale === 'ru'">
        {{ $t(reviews.subtitle) }}
      </p>
      <UiSlider>
        <div
          v-for="(slide, index) in reviews.slides"
          :key="index"
          class="keen-slider__slide reviews__slide"
        >
          <div class="slide-img reviews__slide-img">
            <img
              :src="require(`@/assets/images/${slide.img}`)"
              :alt="$t(slide.alt)"
              loading="lazy"
            />
          </div>
          <p class="text reviews__slide-text">
            {{ $t(slide.text) }}
          </p>
          <div class="slide-info reviews__slide-info">
            <span class="name reviews__slide-info-name">
              {{ $t(slide.name) }}
            </span>
            <span v-if="slide.prof" class="prof reviews__slide-info-profession">
              {{ $t(slide.prof) }}
            </span>
          </div>
        </div>
      </UiSlider>
    </div>
  </section>
</template>

<script setup>
  import { $i18n } from '@/main';
  import { UiSlider } from '@/components/UI';
  const locale = $i18n.value.global.locale;
  defineProps({
    reviews: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss">
  .reviews {
    @include media-sm-min {
      padding: 100px 0 80px !important;
    }
    &__subtitle {
      margin-top: 10px;
      font-size: 15px;
      line-height: 25px;
      text-align: center;
      color: $mono-lables;
    }
    &__slide {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 10px 20px 20px 20px;
      @include media-xs-min {
        padding: 15px 30px 30px 30px;
      }
      @include media-sm-min {
        padding: 40px 60px;
      }
      &-img {
        width: 120px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        @include media-mb-min {
          margin-bottom: 10px;
        }
        img {
          min-height: 50px;
          object-fit: contain;
        }
      }
      &-text {
        @include text(paragraph, small, normal);
        margin-bottom: 20px;
        @include media-sm-min {
          @include text(paragraph, normal, normal);
          line-height: 25px;
          margin-bottom: 35px;
        }
      }
      &-info {
        display: flex;
        flex-direction: column;
        text-align: center;
        &-name {
          font-family: $title-font;
          font-weight: 600;
          @include text(paragraph, normal, normal);
          line-height: 25px;
          @include media-sm-min {
            @include text(paragraph, large, normal);
          }
        }
        &-profession {
          color: $mono-lables;
          @include text(paragraph, small, normal);
          @include media-sm-min {
            @include text(paragraph, normal, normal);
            line-height: 25px;
          }
        }
      }
    }
  }
</style>
