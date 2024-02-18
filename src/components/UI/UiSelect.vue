<template>
  <div class="ui-field">
    <label v-if="hasLabel" class="ui-field__label">
      <slot name="s-label">
        {{ label }}
        <sup v-if="required" class="ui-field__label-sup">*</sup>
      </slot>
    </label>
    <Multiselect
      :value="modelValue"
      :searchable="searchable"
      @change="$emit('update:modelValue', $event)"
      :options="options"
    />
    {{ $event }}
    <p class="ui-field__input-error">{{ $t(details) }}</p>
    <input type="hidden" :name="name" :value="modelValue" />
  </div>
</template>

<script setup>
  import Multiselect from '@vueform/multiselect';
  const props = defineProps({
    options: {
      type: Object,
      required: true,
    },
    searchable: {
      type: Boolean,
      dafault: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    details: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  });
  function hasLabel() {
    return !!this.$slots['s-label'] || !!props.label;
  }
</script>

<style lang="scss">
  .ui-field {
    width: 100%;
    &--is-invalid {
      .multiselect {
        border-color: $red-main;
        background-color: $red-background;
      }
    }
    .multiselect {
      border-radius: 5px;
      height: 35px;
      max-height: 35px;
      min-height: 35px;
      box-shadow: none;
      font-size: 15px;
      &-wrapper {
        height: 100%;
        min-height: 35px;
      }
      &-search {
        height: 33px;
        top: 1px;
      }
      &.is-active {
        box-shadow: none;
        border-color: $blue-hover;
      }
      &-option {
        font-size: 15px;
        &:hover {
          background-color: $mono-bg;
        }
        &.is-selected {
          &:hover {
            background-color: $blue-hover;
          }
          background-color: $blue-hover;
        }
      }
    }
  }
</style>
