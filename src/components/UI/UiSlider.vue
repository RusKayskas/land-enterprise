<template>
  <div class="ui-slider-wrapper">
    <div ref="sliderContainer" class="keen-slider ui-slider">
      <slot />
    </div>
    <div class="slider-nav">
      <UiButton
        icon="icons/slider/arrLeft.svg"
        :class="[
          'ui-button--arrow arrow arrow--left',
          { 'arrow--disabled': disabledRightArrow },
        ]"
        @action="slider.prev()"
      />
      <UiButton
        v-if="slider"
        icon="icons/slider/arrRight.svg"
        :class="[
          'ui-button--arrow arrow arrow--right',
          { 'arrow--disabled': disabledLefttArrow },
        ]"
        @action="slider.next()"
      />
    </div>
  </div>
  <div v-if="slider" class="slider__pagination">
    <button
      v-for="(_slide, index) in dotHelper"
      @click="slider.moveToIdx(index)"
      :class="['slider__pagination-dot', addClassToDots(index)]"
      :key="index"
    />
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useKeenSlider } from 'keen-slider/vue.es';
  import { UiButton } from '@/components/UI';
  const current = ref(0);
  const [sliderContainer, slider] = useKeenSlider({
    initial: current.value,
    slideChanged: (s) => {
      current.value = s.track.details.rel;
    },
  });
  const dotHelper = computed(() =>
    slider.value
      ? [...Array(slider.value.track.details.slides.length).keys()]
      : [],
  );

  const disabledRightArrow = computed(() => {
    return current.value === 0;
  });
  const disabledLefttArrow = computed(() => {
    return current.value === slider._rawValue.track.details.slides.length - 1;
  });
  const addClassToDots = (index) => {
    return {
      dot: true,
      'slider__pagination-dot--is-active': current.value === index,
    };
  };
</script>

<style lang="scss">
  .ui-slider-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    @include media-xs-min {
      margin-top: 50px;
      padding: 0 50px;
    }
    @include media-sm-min {
      margin-top: 60px;
    }
  }
  .ui-slider {
    border-radius: 30px;
    background-color: $blue-bg;
    max-width: 100%;
    @include media-xs-min {
      max-width: 610px;
    }
    @include media-sm-min {
      max-width: 920px;
    }
  }
  //slider navigation
  .slider-nav {
    .arrow {
      width: 45px;
      height: 45px;
      position: absolute;
      fill: $white;
      z-index: 10;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      bottom: -60px;
      @include media-xs-min {
        bottom: auto;
        top: 50%;
        transform: translateY(-50%);
      }
      @include media-sm-min {
        border: 1px solid $blue-main;
      }
      svg {
        fill: $blue-main;
        width: 15px;
        transition: linear 0.2s;
        height: 15px;
      }
      &--disabled {
        pointer-events: none;
        border-color: $mono-lables;
        opacity: 0.5;
        img {
          filter: grayscale(1);
        }
        svg {
          path {
            fill: $mono-lables;
          }
        }
      }
      &--left {
        left: 0px;
      }
      &--right {
        left: auto;
        right: 0px;
      }
    }
  }
  .slider__pagination {
    display: flex;
    justify-content: center;
    margin-top: 33px;
    @include media-xs-min {
      margin-top: 40px;
    }
    &-dot {
      width: 8px;
      height: 8px;
      border: none;
      border-radius: 50%;
      background: $blue-focus;
      &:not(:last-child) {
        margin-right: 15px;
      }
      &--is-active {
        background: $blue-main;
      }
    }
  }
</style>
