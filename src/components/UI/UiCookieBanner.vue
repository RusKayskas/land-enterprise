<template>
  <div class="ui-cookie-banner" v-if="isActive">
    <img
      class="ui-cookie-banner__img"
      src="@/assets/images/cookie.png"
      alt="cookie"
    />
    <p class="ui-cookie-banner__text" v-html="$t(cookies.text)" />
    <UiButton
      @action="isActive = false"
      class="ui-cookie-banner__button"
      :title="$t(cookies.button)"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import UiButton from './UiButton';
  import { cookies } from '@/page/enterprise/data.json';
  const isActive = ref(true);
</script>

<style lang="scss">
  .ui-cookie-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: $cookie-bg;
    box-shadow: $cookie-box-shadow;
    border-radius: 15px;
    position: fixed;
    bottom: 50px;
    z-index: 3;
    padding: 0 10px;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px 16px 16px;
    @include media-sm-min {
      flex-direction: row;
      align-items: center;
    }
    &__text {
      margin: 10px 0 20px;
      max-width: 250px;
      @include text(paragraph, small, normal);
      color: $white;
      @include media-sm-min {
        max-width: 100%;
        margin: 0 20px;
      }
      a {
        color: $blue-main;
        @media (hover: hover) {
          transition: all 0.4s linear;
          &:hover {
            color: $blue-hover;
          }
        }
      }
    }
    &__button {
      @include text(paragraph, normal, bold);
      width: 100%;
      height: 35px;
      @include media-sm-min {
        width: fit-content;
        min-width: fit-content;
      }
    }
  }
</style>
