<template>
  <div class="modal-report">
    <div class="modal-report__img">
      <img :src="require(`@/assets/images/modal/${imgSrc}`)" :alt="imgAlt" />
    </div>
    <div class="modal-report__text">
      <span class="modal-report__text-title title">{{ titleDefault }}</span>
      <p class="modal-report__text-details">
        {{ detaislDefault }}
      </p>

      <UiButton
        v-if="btnTitle"
        :title="btnTitle"
        type="button"
        @action="$emit('confirm')"
        class="modal-report__text-ui-button ui-button--repeat"
      />
    </div>
  </div>
</template>

<script setup>
  import UiButton from '@/components/UI/UiButton.vue';
  import { modalReport } from '@/page/enterprise/data.json';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    imgSrc: {
      type: String,
      required: true,
      default: modalReport.default.imgSrc,
    },
    imgAlt: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    btnTitle: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  const titleDefault = props.title || `${t(modalReport.default.title)}`;
  const detaislDefault = props.details || `${t(modalReport.default.details)}`;
</script>
<style lang="scss">
  .modal-report {
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    &__img {
      margin-top: 70px;
      margin-bottom: 20px;
    }
    &__text {
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      flex-direction: column;
      &-title {
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 10px;
      }
      &-details {
        color: $mono-buttons-tabs;
        font-size: 15px;
        line-height: 25px;
      }
      &-ui-button {
        margin-top: 20px;
      }
    }
  }
</style>
