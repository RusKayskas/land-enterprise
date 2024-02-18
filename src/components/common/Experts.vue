<template>
  <section id="experts" class="experts s-gradient">
    <div class="container experts-wrapper">
      <div class="experts__text">
        <h2 class="experts__title title">
          {{ $t(experts.title) }}
        </h2>
        <p class="experts__details">{{ $t(experts.details) }}</p>
        <UiButton
          @action="feedBackFormModal.open()"
          :title="$t(experts.btn.title)"
          :id="experts.btn.id"
        />
      </div>
      <div class="experts__img">
        <img
          :src="require(`@/assets/images/${experts.img}`)"
          :alt="experts.title"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useModalSlot } from 'vue-final-modal';
  import { useI18n } from 'vue-i18n';
  //компоненты
  import { UiButton } from '@/components/UI';
  import FeedbackForm from '@/components/common/FeedBackForm/index.vue';
  import { modal } from '@/page/enterprise/data';
  const { t } = useI18n();
  defineProps({
    experts: {
      type: Object,
      required: true,
    },
  });
  import { createModal } from '@/services/createModal';
  import { feedBackForm } from '@/page/enterprise/data.json';
  const feedBackFormModal = createModal(
    FeedbackForm,
    t(modal.title),
    t(modal.details),
  );
  feedBackFormModal.patchOptions({
    slots: {
      default: useModalSlot({
        attrs: {
          id: feedBackForm.id,
          onConfirm() {
            feedBackFormModal.close();
          },
        },
      }),
    },
  });
</script>

<style lang="scss">
  .experts {
    padding: 60px 0 0 0;
    @include media-xs-min {
      padding: 80px 0 0 0;
    }
    @include media-sm-min {
      padding: 0;
      padding-top: 100px;
    }
    &::before {
      width: 661px;
      height: 440px;
      border-radius: 661px;
      background: linear-gradient(
        324deg,
        rgba(233, 100, 255, 0.55) 0%,
        #006be5 100%
      );
      filter: blur(140px);
      @include media-sm-min {
        width: 661px;
        height: 440px;
        top: 0%;
        transform: translate(-50%, 0%);
      }
    }
    &-wrapper {
      display: flex;
      align-items: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 40px 15px;
      @include media-xs-min {
        gap: 50px 15px;
      }
      @include media-sm-min {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-end;
      }
    }
    &__text {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      @include media-sm-min {
        margin-bottom: 100px;
        padding: 0;
        text-align: left;
        max-width: 540px;
        align-items: flex-start;
      }
    }
    &__title {
      text-align: center;
      margin-bottom: 10px;
      @include media-sm-min {
        text-align: left;
        line-height: 45px;
        font-size: 35px;
      }
    }
    &__details {
      @include text(paragraph, normal, bold);
      font-weight: 600;
      line-height: 25px;
      margin-bottom: 40px;
      @include media-xs-min {
        margin-bottom: 50px;
      }
      @include media-sm-min {
        font-size: 17px;
        max-width: 540px;
      }
    }
    &__img {
      width: 100%;
      max-width: 590px;
      flex: 1;
      display: flex;
      align-items: flex-end;
      min-width: 360px;
    }
  }
</style>
