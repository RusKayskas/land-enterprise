<template>
  <UiSection class="questions">
    <template v-slot:text>
      <h2 class="section__text-title title title--big">
        {{ $t(questions.title) }}
      </h2>
      <p class="section__text-details">
        {{ $t(questions.details) }}
      </p>
    </template>
    <template v-slot:content>
      <FeedBackForm
        :removeBtnRepeat="(removeBtnRepeat = true)"
        :id="questions.form.id"
        :emailId="questions.form.emailId"
        :textareaId="questions.form.textareaId"
        :buttonId="questions.form.btnId"
      />
    </template>
  </UiSection>
</template>

<script setup>
  import { UiSection } from '@/components/UI';
  import FeedBackForm from '@/components/common/FeedBackForm/index';
  defineProps({
    questions: {
      type: Object,
      required: true,
    },
  });
</script>
<style lang="scss">
  .questions {
    .section-wrapper {
      .section__content {
        min-width: 300px;
        .feedback-form__body {
          @include media-sm-min {
            padding: 40px 50px 25px 50px;
            .ui-field--textarea {
              padding-bottom: 0;
            }
          }
        }
        .feedback-form__footer {
          @include media-sm-min {
            padding: 0px 50px 50px;
          }
        }
      }
    }
  }
</style>
