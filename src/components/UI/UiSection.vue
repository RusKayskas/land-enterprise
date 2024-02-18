<template>
  <section class="section s-gradient">
    <div class="container section-wrapper">
      <div class="section__text">
        <slot name="text" />
      </div>
      <div class="section__content">
        <slot name="content" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .section {
    padding: 60px 0;
    @include media-xs-min {
      padding: 80px 0;
    }
    &.s-gradient {
      &::before {
        display: block;
        width: 787px;
        height: 690px;
        filter: blur(100px);
        border-radius: 787px;
        top: 15%;
        @include media-sm-min {
          width: 815px;
          height: 716px;
          border-radius: 935px;
          filter: blur(200px);
        }
      }
    }
    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 40px 50px;
      @include media-xs-min {
        gap: 50px;
      }
      @include media-sm-min {
        gap: 50px 60px;
      }
    }
    &__text {
      max-width: 525px;
      width: 100%;
      &-title {
        margin-bottom: 10px;
        text-align: center;
        @include media-sm-min {
          text-align: left;
          margin-bottom: 20px;
        }
      }
      &-details {
        font-size: 15px;
        font-weight: 600;
        line-height: 20px;
        text-align: center;
        font-family: $title-font;
        @include media-sm-min {
          text-align: left;
          font-size: 20px;
          line-height: 30px;
        }
      }
    }
    &__content {
      background: $white;
      max-width: 525px;
      overflow: hidden;
      flex: 1;
      min-width: 100%;
      border-radius: 20px;
      color: $white-gray;
      @include media-xs-min {
        min-width: 400px;
        width: 100%;
      }
      @include media-sm-min {
        border-radius: 30px;
      }
    }
  }
</style>
