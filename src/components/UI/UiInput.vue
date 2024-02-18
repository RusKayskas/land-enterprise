<template>
  <div class="ui-field">
    <label v-if="hasLabel" class="ui-field__label">
      <slot name="s-label">
        {{ label }}
        <sup v-if="required" class="ui-field__label-sup">*</sup>
      </slot>
    </label>

    <component
      :is="tag"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :name="name"
      class="ui-field__input"
      :placeholder="placeholder"
      tabindex="0"
      :type="type"
    />
    <p v-if="isDirty" class="ui-field__input-error">
      <span v-for="error in silentErrors" :key="error.$message">
        {{ error.$message }}
      </span>
    </p>
    <p v-if="details" class="ui-field__input-error">{{ details }}</p>
  </div>
</template>
<script setup>
  function hasLabel() {
    return !!this.$slots['s-label'] || !!props.label;
  }
  const props = defineProps({
    tag: {
      type: String,
      default: 'input',
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'tel', 'email', 'password'].includes(value);
      },
    },
    isDirty: {
      type: Boolean,
      default: false,
    },
    silentErrors: {
      type: Array,
      default: () => [],
    },
    details: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss">
  .ui-field {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    position: relative;
    &--textarea {
      .ui-field__input {
        height: 60px;
        resize: none;
      }
    }
    &--is-invalid {
      .ui-field__input {
        border-color: $red-main;
        background-color: $red-background;
        &-error {
          display: block;
        }
      }
    }
    &__label {
      margin-bottom: 5px;
      @include text(label, normal, normal);
      &-sup {
        font-size: 14px;
        top: -0.3em;
        color: $red-main;
      }
    }
    &__input {
      border: 1px solid $mono-border;
      padding: 5px 10px;
      min-height: 35px;
      outline: none;
      border-radius: 5px;
      &:focus {
        border-color: $blue-hover;
      }
      &-error {
        position: absolute;
        bottom: -8px;
        margin-top: 5px;
        display: none;
        color: $red-main;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
