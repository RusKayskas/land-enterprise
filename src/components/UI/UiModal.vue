<template>
  <vue-final-modal
    v-slot="{}"
    v-bind="$attrs"
    class="modal-container"
    content-class="modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    @update:model-value="(val) => $emit('update:modelValue', val)"
  >
    <div class="modal-wrapper modal">
      <div class="modal__header">
        <div class="modal__header-text" v-if="modalTitle">
          <span class="modal__header-text-title title">{{ modalTitle }}</span>
          <p class="modal__header-text-details" v-if="modalDetails">
            {{ modalDetails }}
          </p>
        </div>
        <UiButton
          icon="modal/close.svg"
          class="ui-button--close modal__header-close"
          @action="$emit('update:modelValue', false)"
        />
      </div>
      <div class="modal__content">
        <slot />
      </div>
    </div>
  </vue-final-modal>
</template>

<script setup>
  import { VueFinalModal } from 'vue-final-modal';
  import { UiButton } from '@/components/UI';
  defineProps({
    modalTitle: {
      type: String,
      default: '',
    },
    modalDetails: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss">
  //стили для обертки модалки
  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-radius: 10px;
    margin: 0 1rem;
    background: $white;
    max-height: calc(100vh - 50px);
    @include media-xs-min {
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 500px;
      height: fit-content;
    }
  }
  .modal {
    width: 100%;
    position: relative;
    overflow: auto;
    border-radius: 20px;
    &__header {
      &-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 25px 15px;
        border-bottom: 1px solid $modal-border;
        @include media-xs-min {
          padding: 25px 30px;
        }
        &-title {
          font-size: 20px;
          line-height: 30px;
        }
        &-details {
          max-width: 375px;
          font-size: 15px;
          line-height: 25px;
          color: $mono-buttons-tabs;
        }
      }
      &-close {
        position: absolute;
        right: 15px;
        top: 25px;
        @include media-sm-min {
          right: 30px;
        }
      }
    }
  }
</style>
