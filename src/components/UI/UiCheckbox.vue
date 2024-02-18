<template>
  <div class="ui-checkbox">
    <label class="ui-checkbox__label">
      <input
        class="ui-checkbox__input"
        v-model="valueSource"
        type="checkbox"
        :disabled="disabled"
        :value="option"
      />
      <span class="ui-checkbox__checkmark">
        <span class="ui-checkbox__checkmark-icon" />
      </span>
    </label>
    <p class="ui-checkbox__text" v-html="label" />
  </div>
</template>

//
<script setup>
  import { computed } from 'vue';
  const emit = defineEmits(['update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: [Array, Boolean],
      required: true,
    },
    label: { type: String },
    disabled: {
      type: Boolean,
      default: false,
    },
    option: {
      type: [Object, String, Number],
      default: () => {},
    },
  });
  const valueSource = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });
</script>
<style lang="scss">
  .ui-checkbox {
    display: flex;
    align-items: flex-start;
    &.is-invalid {
      .ui-checkbox__checkmark {
        border-color: $red-main;
      }
    }
    &__label {
      display: block;
      cursor: pointer;
      position: relative;
      cursor: pointer;
    }
    &__input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      display: none;
      width: 0;
      &:checked {
        & ~ .ui-checkbox__checkmark .ui-checkbox__checkmark-icon {
          display: block;
        }
        & ~ .ui-checkbox__checkmark {
          background: $blue-main;
        }
      }
    }
    &__checkmark {
      position: relative;
      width: 15px;
      height: 16px;
      border: 1px solid $mono-lables;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      padding: 2px;
      margin-right: 5px;
      &-icon {
        transform: rotate(45deg);
        width: 5px;
        height: 10px;
        border-bottom: 2px solid $white;
        border-right: 2px solid $white;
      }
    }
    &__text {
      font-size: 11px;
      color: $mono-buttons-tabs;
      line-height: 15px;
      a {
        color: $blue-main;
      }
    }
  }
</style>
