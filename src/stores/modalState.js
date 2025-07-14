import { defineStore } from 'pinia';

export const useModalState = defineStore('modalState', {
  state: () => {
    return {
      isOpen: false, // 화면에 보이는 지 유무
      type: null, // modal의 타입 값
      payload: null, // modal이 열리면서 넘겨줄 값
    };
  },
});
