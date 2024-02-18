<template>
  <header class="header">
    <div class="container header-wrapper">
      <div class="header__logo">
        <img
          :src="require(`@/assets/images/${header.logo.src}`)"
          :alt="header.logo.alt"
        />
      </div>

      <div
        :class="[
          'header__menu-wrapper',
          { 'header__menu-wrapper--active': isMenuToggle },
        ]"
      >
        <nav class="header__menu">
          <ul class="header__menu-list">
            <li
              v-for="(link, index) in header.links"
              :key="index"
              class="header__menu-list-item"
            >
              <a
                class="header__menu-list-item-link"
                :href="link.anchor"
                @click="isMenuToggle = false"
              >
                {{ $t(link.title) }}
              </a>
            </li>
          </ul>
        </nav>

        <UiButton
          tag="a"
          :id="header.btn.id"
          :title="$t(header.btn.title)"
          class="ui-button--small header__menu-wrapper-ui-button"
          @action="orderProduct()"
        />
      </div>

      <a :href="$t(header.phone.href)" class="header__phone">
        <img
          svg-inline
          class="header__phone-img"
          :src="require(`@/assets/images/${header.phone.img.src}`)"
          :alt="$t(header.phone.img.alt)"
        />
        <span class="header__phone-text">
          {{ $t(header.phone.number) }}
        </span>
      </a>

      <button
        @click="toggleMenu"
        :class="[
          'burger',
          'header__burger',
          { 'burger--isActive': isMenuToggle },
        ]"
        type="button"
        title="Menu"
      >
        <span class="burger-bar burger-bar--1" />
        <span class="burger-bar burger-bar--2" />
        <span class="burger-bar burger-bar--3" />
      </button>
    </div>
  </header>
</template>

<script setup>
  import { UiButton } from '@/components/UI';
  import { ref } from 'vue';
  import TariffsDataLayer from '@/helpers/eCommerce/tariffsDataLayer';
  const isMenuToggle = ref(false);
  const toggleMenu = () => {
    isMenuToggle.value = !isMenuToggle.value;
  };
  const dataLayer = new TariffsDataLayer();
  function eCoommece() {
    dataLayer.push();
  }
  defineProps({
    header: {
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
  .header {
    position: fixed;
    background-color: $white;
    z-index: 20;
    left: 0;
    top: 0;
    width: 100%;
    padding: 7.5px 0;
    border-bottom: 1px solid $mono-border;
    @include media-xs-min {
      padding: 15px 0;
    }
    @include media-md-min {
      padding: 20px;
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      z-index: 100;
      background: $white;
      position: absolute;
      left: 0;
      top: 0;
    }
    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__logo {
      margin-right: 30px;
      min-width: 133px;
      position: relative;
      z-index: 101;
      @include media-nb-min {
        margin-right: 92px;
        position: absolute;
        z-index: 99999999999;
        left: 20px;
      }
    }
    &__phone {
      position: relative;
      z-index: 101;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      width: 35px;
      height: 35px;
      margin-right: 10px;
      font-size: 15px;
      color: $blue-main;
      font-weight: 600;
      white-space: nowrap;
      @include media-xs-min {
        width: fit-content;
        margin-right: 15px;
      }
      @include media-md-min {
        position: absolute;
        right: 210px;
      }
      &-text {
        display: none;
        @include media-xs-min {
          display: block;
          margin-left: 10px;
        }
      }
      @media (hover: hover) {
        &:hover {
          color: $blue-hover;
        }
      }
    }
    &__menu-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      padding: 10px 15px 25px;
      pointer-events: none;
      top: -350px;
      width: 100%;
      background: $white;
      flex-direction: column;
      transition: all linear 0.2s;
      &--active {
        top: 50px;
        pointer-events: all;
        @include media-xs-min {
          top: 65px;
        }
      }
      @include media-md-min {
        position: static;
        padding: 0;
        display: flex;
        opacity: 1;
        pointer-events: all;
        z-index: 101;
        flex-direction: row;
        top: auto;
        left: auto;
        justify-content: space-between;
      }
      &-ui-button {
        width: 100%;
        max-width: 100%;
        padding: 10px 15px;
        @include media-md-min {
          width: fit-content;
          height: auto;
          min-width: 190px;
          position: absolute;
          right: 20px;
          max-width: 190px;
          padding: 5px 15px;
          margin-left: 210px;
        }
      }
    }
    &__menu {
      @include media-md-max {
        width: 100%;
      }
      &-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include media-md-max {
          flex-direction: column;
        }
        &-item {
          border-bottom: 1px solid $mono-bg;
          @include media-md-max {
            width: 100%;
          }
          @include media-md-min {
            border-bottom: none;
          }
          &:not(:last-child) {
            @include media-md-min {
              margin-right: 15px;
            }
            @media (min-width: 1260px) {
              margin-right: 30px;
            }
          }
          &-link {
            font-size: 15px;
            font-weight: 600;
            line-height: 25px;
            @media (hover: hover) {
              &:hover {
                color: $blue-hover;
              }
            }
            @include media-md-max {
              padding: 10px 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }

  //burger
  .burger {
    position: relative;
    height: 35px;
    width: 35px;
    display: block;
    z-index: 999;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    pointer-events: all;
    transition: transform 0.6s $transition;
    @include media-md-min {
      display: none;
    }
    &-bar {
      background-color: $mono-main;
      position: absolute;
      top: 50%;
      right: 10px;
      left: 10px;
      height: 2px;
      width: 15px;
      margin-top: -1px;
      transition: transform 0.6s $transition, opacity 0.3s $transition,
        background-color 0.6s $transition;
      &--1 {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
      }
      &--2 {
        transform-origin: 100% 50%;
      }
      &--3 {
        transform: translateY(6px);
      }
    }
    &--isActive {
      transform: rotate(-180deg);
      .burger-bar--1 {
        transform: rotate(45deg);
      }
      .burger-bar--2 {
        opacity: 0;
      }
      .burger-bar--3 {
        transform: rotate(-45deg);
      }
    }
    &:hover {
      .burger-bar--2 {
        transform: scaleX(1);
      }
    }
  }
  .no-touchevents .burger-bar--2:hover {
    transform: scaleX(1);
  }
</style>
