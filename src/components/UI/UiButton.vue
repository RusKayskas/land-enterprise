<template>
  <component
    :is="tag"
    :id="id"
    :href="href"
    class="ui-button"
    @click="$emit('action', event)"
  >
    {{ title }}
    <slot name="icon">
      <div v-if="icon">
        <img
          svg-inline
          class="ui-button__icon"
          :src="require(`@/assets/images/${icon}`)"
          alt="arrow"
        />
      </div>
    </slot>
  </component>
</template>

<script setup>
  defineProps({
    tag: {
      type: String,
      default: 'button',
    },
    type: {
      type: String,
      default: 'button',
    },
    id: {
      type: String,
      required: false,
    },
    href: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss">
  .ui-button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: none;
    outline: none;
    border: none;
    white-space: nowrap;
    background: $blue-main;
    color: $white;
    padding: 15px 20px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 5px;
    min-width: 220px;
    line-height: 25px;
    cursor: pointer;
    @include media-sm-min {
      padding: 15px 45px;
    }
    @media (hover: hover) {
      transition: all 0.4s linear;
      &:hover {
        background: $blue-hover;
        color: $white;
      }
    }
    &--small {
      font-size: 15px;
    }
    &--green {
      padding: 0 10px;
      font-size: 15px;
      min-height: 35px;
      height: 35px;
      min-width: fit-content;
      background: $green-main;
      width: fit-content;
      color: $white;
      &:disabled {
        cursor: not-allowed;
        background: $green-main;
        opacity: 0.6;
        &:hover {
          background: $green-main;
        }
      }
    }
    &--repeat {
      border-radius: 5px;
      background: $mono-repeat-bg;
      color: $mono-buttons-tabs;
      width: 190px;
      padding: 5px 15px;
      font-size: 15px;
    }
    &--white {
      border: 1px solid $white;
      background: inherit;
      padding: 10px 15px;
      font-size: 18px;
    }
    &--arrow {
      width: 45px;
      height: 45px;
      min-width: auto;
      padding: 0;
      position: absolute;
      fill: #fff;
      z-index: 10;
      cursor: pointer;
      display: flex;
      background: transparent;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      svg {
        outline: none;
      }
      @media (hover: hover) {
        img {
          transition: all 0.4s linear;
        }
        &:hover {
          img {
            filter: brightness(0) invert(1);
          }
        }
      }
    }
    &--close {
      width: 30px;
      height: 30px;
      min-width: 30px;
      background: none;
      padding: 0;
      @media (hover: hover) {
        &:hover {
          background: none;
        }
      }
    }
    &__icon {
      display: flex;
    }
  }
</style>
