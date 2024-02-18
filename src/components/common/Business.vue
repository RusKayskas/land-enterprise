<template>
  <section
    id="bissines"
    class="bissines section--padding section--padding--small-top"
  >
    <div class="container">
      <h2 class="bissines__title title title--section title--margin">
        {{ $t(bisiness.title) }}
      </h2>

      <div class="bissines-wrapper">
        <div
          v-for="(problem, idx) in bisiness.problems"
          :key="idx"
          class="bissines__card"
        >
          <div class="bissines__card-img">
            <img
              svg-inline
              :src="require(`@/assets/images/${problem.img}`)"
              :alt="$t(problem.problemTitle)"
            />
          </div>

          <div class="bissines__card-problem">
            <span class="bissines__card-problem-title title">
              {{ $t(problem.problemTitle) }}
            </span>
            <p class="bissines__card-problem-details">
              {{ $t(problem.problemDetails) }}
            </p>
          </div>

          <div class="bissines__card-answer">
            <span class="bissines__card-answer-title title">
              {{ $t(problem.answerTitle) }}
            </span>
            <p class="bissines__card-answer-details">
              {{ $t(problem.answerDetails) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    bisiness: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss">
  .bissines {
    &-wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
      gap: 40px;
      @include media-sm-min {
        column-gap: 60px;
      }
    }
    &__card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      align-items: center;
      flex: 1;
      width: 100%;
      max-width: 525px;
      min-width: 330px;
      &-img {
        width: 100%;
        max-width: 90px;
        height: 90px;
        overflow: hidden;
        margin-bottom: 15px;
        @include media-sm-min {
          max-width: 120px;
          height: 120px;
          margin-bottom: 20px;
        }
      }
      &-problem {
        margin-bottom: 15px;
        @include media-sm-min {
          margin-bottom: 20px;
        }
        &-title {
          display: block;
          @include text(paragraph, normal, bold);
          margin-bottom: 5px;
          @include media-xs-min {
            @include text(paragraph, large, bold);
            line-height: 20px;
          }
          @include media-sm-min {
            font-size: 20px;
            line-height: 30px;
          }
        }
        &-details {
          @include text(paragraph, normal, bold);
          line-height: 25px;
          @include media-sm-min {
            @include text(paragraph, large, bold);
          }
        }
      }
      &-answer {
        padding: 15px;
        border-radius: 15px;
        background: $blue-bg;
        @include media-xs-min {
          padding: 15px 20px 20px 20px;
        }
        @include media-sm-min {
          padding: 25px 30px;
        }
        &-title {
          display: block;
          @include text(paragraph, small, bold);
          margin-bottom: 5px;
          @include media-xs-min {
            @include text(paragraph, normal, bold);
          }
          @include media-sm-min {
            @include text(paragraph, large, bold);
            margin-bottom: 10px;
          }
        }
        &-details {
          @include text(paragraph, normal, bold);
          line-height: 25px;
          @include media-sm-min {
            @include text(paragraph, large, bold);
          }
        }
      }
    }
  }
</style>
