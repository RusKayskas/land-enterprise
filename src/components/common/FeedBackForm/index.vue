<template>
  <form
    @submit.prevent="() => sendForm(id)"
    :id="id"
    :name="feedBackForm.name"
    class="feedback-form"
    type="bot"
  >
    <div class="feedback-form__body feedback-form__block">
      <!-- Форма по default  consultForm-->
      <ConsultForm
        v-if="isDefaultForm"
        :emailId="emailId"
        @isLetter="isLetter"
      />
      <!-- форма пробный период TrialForm-->
      <TrialForm v-else @isLetter="isLetter" />
      <!-- textarea -->
      <UiInput
        tag="textarea"
        v-model.trim="state.comment"
        :label="$t(feedBackForm.inputs.textarea.labelName)"
        :id="textareaId"
        :name="feedBackForm.inputs.textarea.name"
        :isDirty="v$.comment.$dirty"
        :silentErrors="v$.comment.$silentErrors"
        :class="['ui-field--textarea', isInputError(v$.comment.$error)]"
        @input="v$.comment.$validate()"
      />
    </div>

    <div class="feedback-form__footer feedback-form__block">
      <div class="feedback-form__footer-capcha">
        <Recapcha v-model="recaptcha" @verify="checkRecapcha" />
      </div>
      <UiCheckbox
        v-model="state.checkbox"
        :value="state.checkbox"
        @change="v$.checkbox.$touch()"
        :class="[
          'feedback-form__footer-checkbox',
          isInputError(v$.checkbox.$error),
        ]"
        :label="$t(feedBackForm.inputs.checkbox.label)"
      />
      <UiButton
        :disabled="isDisabled"
        button="submit"
        class="feedback-form__footer-button ui-button--green"
        :title="$t(feedBackForm.btn.title)"
        :id="buttonId"
      />
    </div>
  </form>
</template>

<script setup>
  import TrialForm from './TrialForm.vue';
  import ConsultForm from './ConsultForm.vue';
  import { required, helpers, maxLength } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { reactive, computed, ref } from 'vue';
  import { useModalSlot } from 'vue-final-modal';
  import { useI18n } from 'vue-i18n';
  import AxiosApi from '@/services/axios';
  //компоненты
  import { UiButton, UiInput, UiCheckbox } from '@/components/UI';
  import Recapcha from './Recapcha.vue';
  import ModalReport from './ModalReport.vue';
  import FeedbackForm from '@/components/common/FeedBackForm/index.vue';
  //dataJson
  import {
    feedBackForm,
    modal,
    modalReport,
  } from '@/page/enterprise/data.json';
  const isDisabled = ref(true);
  const recaptcha = ref(null);
  const { t } = useI18n();
  //пропсы
  const props = defineProps({
    id: {
      type: String,
      dafault: feedBackForm.id,
    },
    removeBtnRepeat: {
      type: Boolean,
      default: false,
    },
    isDefaultForm: {
      type: Boolean,
      default: true,
    },
    emailId: {
      type: String,
      default: feedBackForm.inputs.emailInput.id,
    },
    textareaId: {
      type: String,
      default: feedBackForm.inputs.textarea.id,
    },
    buttonId: {
      type: String,
      default: feedBackForm.btn.id,
    },
  });
  //валидация
  const state = reactive({
    comment: '',
    checkbox: false,
  });
  const rules = computed(() => {
    return {
      comment: {
        noEmoji: helpers.withMessage(
          t(feedBackForm.required.emoji),
          (value) => !/\p{Extended_Pictographic}/gu.test(value),
        ),
        maxLength: helpers.withMessage(
          t(feedBackForm.required.commentMaxLength),
          maxLength(4096),
        ),
      },
      checkbox: { required, checked: (value) => value === true },
    };
  });
  //только буквы
  const isLetter = (e) => {
    let char = String.fromCharCode(e.keyCode);
    /^([а-яёА-ЯЁ]+|[a-zA-Z]+)$/.test(char) ? true : e.preventDefault();
  };

  const v$ = useVuelidate(rules, state);

  import { createModal } from '@/services/createModal';
  //модалки
  const modalReportSuccess = createModal(ModalReport);

  const modalReportError = createModal(ModalReport);
  modalReportError.patchOptions({
    slots: {
      default: useModalSlot({
        attrs: {
          title: t(modalReport.error.title),
          details: t(modalReport.error.details),
          imgSrc: modalReport.error.imgSrc,
          imgAlt: t(modalReport.error.imgAlt),
        },
      }),
    },
  });
  if (!props.removeBtnRepeat) {
    modalReportError.patchOptions({
      slots: {
        default: useModalSlot({
          attrs: {
            btnTitle: t(modalReport.error.btnTitle),
            onConfirm() {
              feedBackFormModal.open();
              modalReportError.close();
            },
          },
        }),
      },
    });
  }
  if (!props.isDefaultForm) {
    const TrialFormModal = createModal(
      FeedbackForm,
      'Заявка на пробный период',
    );
    TrialFormModal.patchOptions({
      slots: {
        default: useModalSlot({
          attrs: {
            isDefaultForm: false,
            onConfirm() {
              TrialFormModal.close();
            },
          },
        }),
      },
    });
    modalReportError.patchOptions({
      slots: {
        default: useModalSlot({
          attrs: {
            btnTitle: t(modalReport.error.btnTitle),
            onConfirm() {
              TrialFormModal.open();
              modalReportError.close();
            },
          },
        }),
      },
    });
  }
  // модалка для вызова формы
  const feedBackFormModal = createModal(
    FeedbackForm,
    t(modal.title),
    t(modal.details),
  );
  feedBackFormModal.patchOptions({
    slots: {
      default: useModalSlot({
        attrs: {
          onConfirm() {
            feedBackFormModal.close();
          },
        },
      }),
    },
  });
  //получание значения recapcha , обработка ошибок ,отправка формы
  const checkRecapcha = (response) => {
    recaptcha.value = response;
  };
  const isInputError = (value) => {
    disableButtonCheck();
    return value ? 'ui-field--is-invalid' : '';
  };

  const disableButtonCheck = () => {
    isDisabled.value = !v$.value.$invalid && recaptcha.value ? false : true;
  };

  const $emit = defineEmits(['confirm']);
  const type = ref('webprotection-enterprise');

  async function sendForm(formId) {
    const form = document.forms[formId]; // Используйте переданный formId
    const formData = new FormData(form);
    formData.set('reCaptcha', formData.get('g-recaptcha-response'));
    formData.set('type', type.value);
    let $axios = new AxiosApi();
    await $axios.axios
      .post('', formData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      .then(() => {
        $emit('confirm');
        setTimeout(() => {
          modalReportSuccess.open();
        }, 0);
        recaptcha.value = '';
      })
      .catch(() => {
        $emit('confirm');
        setTimeout(() => {
          modalReportError.open();
        }, 0);
        recaptcha.value = '';
      });
  }
</script>

<style lang="scss">
  .feedback-form {
    display: flex;
    background-color: $white;
    color: $mono-main;
    flex-direction: column;
    &__block {
      padding: 20px 15px 0px 15px;
      @include media-mb-min {
        padding: 30px 30px 25px 30px;
      }
    }
    &__inputs-group {
      display: flex;
      flex-direction: column;
      @include media-xs-min {
        flex-direction: row;
        justify-content: space-between;
      }
      .ui-field {
        max-width: 100%;
        @include media-xs-min {
          max-width: 47%;
        }
      }
    }
    &__body {
      &-capcha {
        margin: 25px 0;
        height: 70px;
      }
      &-chekbox {
        margin-bottom: 25px;
      }
    }
    &__footer {
      padding-top: 0;
      padding-bottom: 20px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      @include media-xs-min {
        margin-top: 0;
      }
      &-checkbox {
        margin-top: 25px;
      }
      &-button {
        margin-top: 25px;
        @include media-xs-min {
          width: fit-content;
        }
      }
    }
  }
</style>
