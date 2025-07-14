<script scoped></script>
<template>
  <p class="Location">
    <a href="#" class="btn_set home">메인으로</a>
    <a href="#" class="btn_nav bold">학습 관리</a>
    <span class="btn_nav bold">강의 목록</span>
    <a href="#" class="btn_set refresh">새로고침</a>
  </p>

  <p class="conTitle" style="height: 110px">
    <span style="display: block">강의 목록</span>
    <span class="fr" style="margin-top: 0px">
      <span style="margin: 0 0px">
        <select
          id="searchTag"
          v-model="searchTag"
          name="searchTag"
          style="width: 90px; height: 27px"
        >
          <option value="lecName">강의명</option>
          <option value="lecInstructorName">강사명</option>
          <option value="lecRoomName">강의실</option>
        </select>
        <input
          id="searchTitle"
          v-model="searchTitle"
          type="text"
          name="searchTitle"
          style="width: 350px; height: 25px; margin-right: 5px"
        />
      </span>
      <span style="margin: 0 5px">
        강의 기간
        <input
          id="searchStDate"
          v-model="searchStDate"
          type="date"
          name="searchStDate"
          style="height: 25px"
        />
        ~
        <input
          id="searchEdDate"
          v-model="searchEdDate"
          type="date"
          name="searchEdDate"
          style="height: 25px; margin-right: 5px"
        />
      </span>
      <span>
        <a class="btnType red" href="" name="searchbtn" id="searchBtn"
          ><button @click="handlerSearch">검색</button></a
        >
      </span>
    </span>
  </p>
</template>

<style></style>
