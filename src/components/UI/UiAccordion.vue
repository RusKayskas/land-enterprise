<template>
  <div class="ui-accordion">
    <div
      v-for="(text, index) in faq"
      :key="index"
      :class="[
        'ui-accordion__card',
        { 'ui-accordion__card--is-active': addActiveFaq(index) },
      ]"
      @click="faqTrigger(index)"
    >
      <div class="ui-accordion__card-head">
        <p class="ui-accordion__card-title title" v-html="$t(text.title)" />
        <img
          class="ui-accordion__card-icon"
          svg-inline
          src="@/assets/images/icons/slider/arrLeft.svg"
          alt=""
        />
      </div>
      <div class="ui-accordion__card-content">
        <p v-html="$t(text.details)" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  defineProps({
    faq: {
      type: Object,
      required: true,
    },
  });
  const isCurrentFaq = ref(false);
  const faqTrigger = (index) => {
    index === isCurrentFaq.value
      ? (isCurrentFaq.value = false)
      : (isCurrentFaq.value = index);
  };
  const addActiveFaq = (index) => {
    return isCurrentFaq.value === index;
  };
</script>
<style lang="scss">
  .ui-accordion {
    display: grid;
    gap: 20px 0;
    &__card {
      border-radius: 10px;
      transition: linear 0.2s;
      background-color: $white;
      &--is-active {
        padding-bottom: 20px;
        .ui-accordion__card-content {
          max-height: 500px;
          overflow: hidden;
        }
        @include media-sm-min {
          padding-bottom: 25px;
        }
        .ui-accordion__card-icon {
          transform: rotate(-270deg);
          path {
            fill: $blue-main;
          }
        }
      }
      &-head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: 20px;
        @include media-xs-min {
          @include text(paragraph, normal, bold);
        }
        @include media-sm-min {
          padding-left: 25px;
        }
      }
      &-title {
        @include text(paragraph, small, bold);
        line-height: 20px;
        text-align: left;
        padding-right: 20px;
        @include media-xs-min {
          line-height: 25px;
          @include text(paragraph, normal, bold);
        }
        @include media-sm-min {
          @include text(paragraph, large, bold);
        }
      }
      &-icon {
        min-width: 25px;
        width: 25px;
        height: 25px;
        padding: 5px;
        transform: rotate(-90deg);
        transition: linear 0.2s;
        path {
          fill: $mono-lables;
          transition: linear 0.2s;
        }
      }
      &-content {
        max-height: 0px;
        overflow: hidden;
        padding: 0 20px;
        @include media-xs-min {
          @include text(paragraph, normal, bold);
        }
        @include media-sm-min {
          padding: 0 55px 0px 25px;
        }
        p {
          @include text(paragraph, normal, normal);
          line-height: 25px;
          @include media-sm-min {
            @include text(paragraph, large, normal);
          }
          a {
            color: $blue-main;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
