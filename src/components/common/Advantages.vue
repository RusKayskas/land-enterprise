<template>
  <section
    id="advantages"
    class="advantages section--padding section--padding--small-top"
  >
    <div class="container">
      <h2 class="advantages__title title title--section title--margin">
        {{ $t(advantages.title) }}
      </h2>
      <div class="advantages-wrapper">
        <div
          v-for="(card, index) in advantages.cards"
          :key="index"
          class="advantages__card"
        >
          <div class="advantages__card-img">
            <img
              svg-inline
              :src="require(`@/assets/images/${card.img}`)"
              :alt="card.title"
            />
          </div>
          <div class="advantages__card-text">
            <span class="advantages__card-title title">{{
              $t(card.title)
            }}</span>
            <p class="advantages__card-details">
              {{ $t(card.details) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    advantages: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss">
  .advantages {
    &-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-gap: 15px;
      @include media-xs-min {
        grid-gap: 20px;
      }
      @include media-sm-min {
        grid-gap: 30px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      }
    }
    &__card {
      padding: 20px;
      display: flex;
      flex-direction: column;
      border-radius: 15px;
      border: 1px solid $mono-border;
      text-align: center;
      @include media-xs-min {
        padding: 25px;
        text-align: left;
      }
      @include media-sm-min {
        padding: 30px;
      }
      &-img {
        margin-bottom: 15px;
        @include media-sm-min {
          margin-bottom: 30px;
        }
      }
      &-text {
        display: flex;
        flex-direction: column;
      }
      &-title {
        @include text(paragraph, small, bold);
        margin-bottom: 5px;
        @include media-mb-min {
          @include text(paragraph, normal, bold);
          line-height: 25px;
        }
        @include media-sm-min {
          @include text(paragraph, large, bold);
          margin-bottom: 10px;
        }
      }
      &-details {
        color: $mono-buttons-tabs;
        @include text(paragraph, small, bold);
        @include media-sm-min {
          @include text(paragraph, normal, bold);
          line-height: 25px;
        }
      }
    }
  }
</style>
