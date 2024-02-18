<template>
  <ul class="ui-list">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="`ui-list__item ui-list__item--${type} ui-list__item--${color}`"
      v-html="$t(item)"
    ></li>
  </ul>
</template>

<script setup>
  defineProps({
    list: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'white'].includes(value);
      },
    },
    type: {
      type: String,
      default: 'bullets',
      validator(value) {
        return ['bullets', 'success'].includes(value);
      },
    },
  });
</script>

<style lang="scss">
  .ui-list {
    display: grid;
    grid-gap: 10px 0;
    &__item {
      display: flex;
      align-items: center;
      @include text(paragraph, normal, normal);
      @include media-sm-min {
        @include text(paragraph, large, normal);
        line-height: 25px;
      }
      &::before {
        content: '';
        position: relative;
        display: block;
        margin-right: 15px;
      }
      &--bullets {
        @include media-sm-min {
          &::before {
            display: block;
            width: 8px;
            height: 8px;
            border: 2px solid $blue-accent;
          }
        }
      }
      &--success {
        align-items: flex-start;
        &::before {
          transform: rotate(45deg);
          margin-top: 5px;
          width: 7px;
          height: 12px;
          margin-left: 4px;
          border-bottom: 2px solid $blue-main;
          border-right: 2px solid $blue-main;
        }
      }
      &--white {
        color: $white;
      }
    }
  }
</style>
