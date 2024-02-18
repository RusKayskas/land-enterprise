<template>
  <!-- Форма по default -->
  <!-- name input-->
  <UiInput
    :label="$t(feedBackForm.inputs.nameInput.labelName)"
    required
    v-model.trim="state.name"
    :id="feedBackForm.inputs.nameInput.id"
    :type="feedBackForm.inputs.nameInput.type"
    :name="feedBackForm.inputs.nameInput.name"
    :isDirty="v$.name.$dirty"
    :silentErrors="v$.name.$silentErrors"
    :class="isInputError(v$.name.$error)"
    @keypress="$emit('isLetter', $event)"
    @input="v$.name.$validate()"
  />
  <!-- email input-->
  <UiInput
    :label="feedBackForm.inputs.emailInput.labelName"
    required
    v-model.trim="state.email"
    :id="emailId"
    :type="feedBackForm.inputs.emailInput.type"
    :name="feedBackForm.inputs.emailInput.name"
    :isDirty="v$.email.$dirty"
    :silentErrors="v$.email.$silentErrors"
    :class="isInputError(v$.email.$error)"
    @input="v$.email.$validate()"
  />

  <!-- phone input-->
  <UiInput
    v-mask="$t(feedBackForm.inputs.phoneInput.vmask)"
    v-model="state.phone"
    :label="$t(feedBackForm.inputs.phoneInput.labelName)"
    :id="feedBackForm.inputs.phoneInput.id"
    :type="feedBackForm.inputs.phoneInput.type"
    :name="feedBackForm.inputs.phoneInput.name"
    :details="v$.phone.minLength.$message"
    :class="isInputError(v$.phone.$error)"
    :placeholder="$t(feedBackForm.inputs.phoneInput.placeholder)"
    @input="v$.phone.$validate()"
  />
</template>

<script setup>
  import {
    required,
    email,
    helpers,
    minLength,
    maxLength,
  } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { reactive, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  //компоненты
  import { UiInput } from '@/components/UI';
  //dataJson
  import { feedBackForm } from '@/page/enterprise/data.json';
  defineProps({
    emailId: {
      type: String,
      default: feedBackForm.inputs.emailInput.id,
    },
  });
  function isInputError(value) {
    return value ? 'ui-field--is-invalid' : '';
  }
  const { t } = useI18n();
  //валидация
  const state = reactive({
    name: '',
    email: '',
    phone: '',
  });
  const rules = computed(() => {
    return {
      name: {
        required: helpers.withMessage(
          t(feedBackForm.required.details),
          required,
        ),
        minLength: helpers.withMessage(
          t(feedBackForm.required.nameMinLength),
          minLength(2),
        ),
        maxLength: helpers.withMessage(
          t(feedBackForm.required.nameMaxLength),
          maxLength(36),
        ),
      },
      email: {
        required: helpers.withMessage(
          t(feedBackForm.required.details),
          required,
        ),
        email: helpers.withMessage(
          `${t(feedBackForm.required.mailform)} yourname@mail.com`,
          email,
        ),
      },
      phone: {
        minLength: helpers.withMessage(
          t(feedBackForm.required.phoneError),
          minLength(17),
        ),
      },
    };
  });

  const v$ = useVuelidate(rules, state);
</script>
