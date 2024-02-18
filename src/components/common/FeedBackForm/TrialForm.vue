<template>
  <!-- форма пробный период -->
  <!--company input-->
  <UiInput
    :label="trialForm.inputs.company.label"
    required
    :details="$t(feedBackForm.required.details)"
    v-model.trim="state.company"
    :id="trialForm.inputs.company.id"
    :type="feedBackForm.inputs.nameInput.type"
    name="corporateName"
    :class="isInputError(v$.company.$error)"
    @input="v$.company.$validate()"
  />
  <div class="feedback-form__inputs-group">
    <!-- name input-->
    <UiInput
      :label="$t(feedBackForm.inputs.nameInput.labelName)"
      required
      v-model.trim="state.name"
      :id="feedBackForm.inputs.nameInput.id"
      :type="feedBackForm.inputs.nameInput.type"
      :name="feedBackForm.inputs.nameInput.name"
      :class="isInputError(v$.name.$error)"
      :isDirty="v$.name.$dirty"
      :silentErrors="v$.name.$silentErrors"
      @keypress="$emit('isLetter', $event)"
      @input="v$.name.$validate()"
    />

    <UiInput
      :label="trialForm.inputs.job.label"
      :id="trialForm.inputs.job.id"
      name="jobTitle"
      :type="feedBackForm.inputs.nameInput.type"
    />
  </div>

  <div class="feedback-form__inputs-group">
    <!-- phone input-->
    <UiInput
      v-mask="$t(feedBackForm.inputs.phoneInput.vmask)"
      required
      :label="$t(feedBackForm.inputs.phoneInput.labelName)"
      v-model.trim="state.phone"
      :id="feedBackForm.inputs.phoneInput.id"
      :type="feedBackForm.inputs.phoneInput.type"
      :name="feedBackForm.inputs.phoneInput.name"
      :class="isInputError(v$.phone.$error)"
      :placeholder="$t(feedBackForm.inputs.phoneInput.placeholder)"
      :isDirty="v$.phone.$dirty"
      :silentErrors="v$.phone.$silentErrors"
      @input="v$.phone.$validate()"
    />

    <UiInput
      :label="trialForm.inputs.corpEmail.label"
      required
      v-model.trim="state.corpEmail"
      :id="trialForm.inputs.corpEmail.id"
      :type="feedBackForm.inputs.emailInput.type"
      :name="feedBackForm.inputs.emailInput.name"
      :class="isInputError(v$.corpEmail.$error)"
      :isDirty="v$.corpEmail.$dirty"
      :silentErrors="v$.corpEmail.$silentErrors"
      @input="v$.corpEmail.$validate()"
    />
  </div>
  <UiInput
    :label="trialForm.inputs.site.label"
    required
    :details="$t(feedBackForm.required.details)"
    v-model.trim="state.site"
    :id="trialForm.inputs.site.id"
    :placeholder="trialForm.inputs.site.placeholder"
    type="text"
    :name="trialForm.inputs.site.name"
    :class="isInputError(v$.site.$error)"
    @input="v$.site.$validate()"
  />
  <div class="feedback-form__inputs-group">
    <UiSelect
      :label="trialForm.selects.tariff.label"
      required
      :class="isInputError(v$.tariff.$error)"
      :details="$t(feedBackForm.required.details)"
      v-model.trim="state.tariff"
      name="tariff"
      :options="trialForm.selects.tariff.list"
      @click="v$.tariff.$validate()"
    />
    <UiSelect
      :label="trialForm.selects.countries.label"
      required
      :class="isInputError(v$.country.$error)"
      :details="$t(feedBackForm.required.details)"
      searchable
      v-model.trim="state.country"
      :value="state.country"
      name="country"
      :options="trialForm.selects.countries.list"
      @click="v$.country.$validate()"
    />
  </div>
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
  import { feedBackForm, trialForm } from '@/page/enterprise/data.json';
  import { UiInput, UiSelect } from '@/components/UI';
  const { t } = useI18n();
  function isInputError(value) {
    return value ? 'ui-field--is-invalid' : '';
  }

  const siteUrlCheck = helpers.regex(/^([\wёa-я-]{2,}\.)+[\wёa-я-]{2,}$/i);
  //валидация
  const state = reactive({
    name: '',
    company: '',
    phone: '',
    email: '',
    corpEmail: '',
    country: '',
    site: '',
    tariff: '',
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
      company: { required },
      phone: {
        required: helpers.withMessage(
          t(feedBackForm.required.details),
          required,
        ),
        minLength: helpers.withMessage(
          t(feedBackForm.required.phoneError),
          minLength(17),
        ),
      },
      site: { required, siteUrlCheck },
      tariff: { required },
      country: { required },
      corpEmail: {
        required: helpers.withMessage(
          t(feedBackForm.required.details),
          required,
        ),
        email: helpers.withMessage(
          `${t(feedBackForm.required.mailform)} yourname@mail.com`,
          email,
        ),
      },
    };
  });
  const v$ = useVuelidate(rules, state);
</script>
