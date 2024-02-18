import { useModal, useModalSlot } from 'vue-final-modal';
import { UiModal } from '@/components/UI';
export const createModal = (myComponent, title, details) =>
  useModal({
    defaultModelValue: false,
    component: UiModal,
    attrs: {
      clickToClose: true,
      escToClose: true,
      modalTitle: title,
      modalDetails: details,
    },
    slots: {
      default: useModalSlot({
        component: myComponent,
        attrs: {
          onConfirm() {
            close();
          },
        },
      }),
    },
  });
