<script setup>
import { useModalState } from '@/stores/modalState';

const modalState = useModalState();
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <form ref="formRef" class="modal-form modal-container">
        <label> 제목 :<input type="text" name="title" /> </label>
        <label> 내용 :<input type="text" name="content" /> </label>
        파일 :
        <input id="fileInput" type="file" name="file" />
        <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
        <div>
          <div>
            <label>미리보기</label>
            <img class="preview-image" />
          </div>
        </div>
        <div class="button-container">
          <button type="button">저장</button>
          <button type="button">삭제</button>
          <button type="button" @click="modalState.$patch({ isOpen: false })">나가기</button>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<style>
@import './styled.css';
</style>
