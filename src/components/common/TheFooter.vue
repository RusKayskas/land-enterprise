<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__info">
        <a
          v-for="(info, index) in filterList(footer.infos)"
          :key="index"
          :href="$t(info.link)"
          class="footer__info-link"
          :target="info.target"
          :rel="info.rel"
        >
          <img
            :src="require(`@/assets/images/icons/${info.img}`)"
            :alt="info.alt"
          />
          <span>{{ $t(info.title) }}</span>
        </a>
      </div>
      <div class="footer__politics">
        <a
          v-for="(politic, index) in footer.politics"
          .key="index"
          :href="$t(politic.link)"
          class="footer__politics-link"
          :target="politic.target"
          :rel="politic.rel"
        >
          {{ $t(politic.title) }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { filterList } from '@/helpers/filterList';
  defineProps({
    footer: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss">
  .footer {
    flex: 0 0 auto;
    padding: 40px 0 30px;
    color: $white;
    background: $blue-dark;
    @include media-sm-min {
      padding: 40px 0 10px;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__info {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 10px;
      @include media-sm-min {
        flex-direction: row;
        flex-wrap: wrap;
      }
      &-link {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        font-weight: 600;
        line-height: 25px;
        font-size: 15px;
        white-space: nowrap;
        @include media-sm-min {
          &:not(:last-child) {
            margin-right: 50px;
          }
        }
        img {
          width: 20px;
          min-width: 20px;
        }
        @media (hover: hover) {
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
    &__politics {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      @include media-sm-min {
        flex-direction: row;
      }
      &-link {
        color: $mono-buttons-tabs;
        margin-bottom: 10px;
        @include media-sm-min {
          &:not(:last-child) {
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
