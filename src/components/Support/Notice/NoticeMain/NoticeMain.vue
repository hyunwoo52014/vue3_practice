<script setup>
import PageNavigation from '@/components/common/PageNavigation.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NoticeModal from '../NoticeModal/NoticeModal.vue';
import { useModalState } from '@/stores/modalState';

const route = useRoute();
const noticeList = ref([]);
const noticeCount = ref(0);
const modalState = useModalState();

console.log('route', route);

const noticeSearch = (cPage = 1) => {
  const param = new URLSearchParams(route.query);
  param.append('currentPage', cPage);
  param.append('pageSize', 5);

  //json 과 object 차이
  axios.post('/api/support/noticeListBody.do', param).then((res) => {
    noticeList.value = res.data.list;
    noticeCount.value = res.data.count;
  });

  /*
  // { cPage: 1}
  const params = {
    currentPage: cPage, //key와 value 가 같으면 한번만 해도 됨
    pageSize: 5,
    ...route.query,
  };
  */
};

const noticeDetail = () => {
  modalState.$patch({ isOpen: true });
};

onMounted(() => {
  noticeSearch();
});

// 값, 함수로 값의 변화가 관측되면 함수 실행
watch(
  () => route.query,
  () => {
    noticeSearch();
  },
);
</script>

<template>
  <div class="notice-main-container">
    <table class="notice-table">
      <thead class="notice-table-header">
        <tr>
          <th>공지번호</th>
          <th>공지 제목</th>
          <th>공지 날짜</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="noticeCount > 0">
          <tr v-for="notice in noticeList" :key="notice.noticeId" class="notice-table-row">
            <td class="notice-cell">{{ notice.noticeId }}</td>
            <td
              class="notice-cell cursor-pointer hover:underline"
              @click="modalState.$patch(noticeDetail)"
            >
              {{ notice.noticeTitle }}
            </td>
            <td class="notice-cell">{{ notice.regDate.substr(0, 10) }}</td>
            <td class="notice-cell">{{ notice.loginId }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" class="notice-empty-row">일치하는 검색 결과가 없습니다</td>
          </tr>
        </template>
      </tbody>
    </table>
    <PageNavigation :total-items="noticeCount" :items-per-page="5" :on-page-change="noticeSearch" />
  </div>
  <NoticeModal v-if="modalState.isOpen" />
</template>

<style>
@import './styled.css';
</style>
