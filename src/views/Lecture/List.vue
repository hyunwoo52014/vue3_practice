<script setup>
import PageNavigation from '@/components/common/PageNavigation.vue';
import router from '@/router';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

///
const searchTag = ref('lecName');
const searchTitle = ref('');
const searchStDate = ref('');
const searchEdDate = ref('');
const currentPage = ref(1);
const pageSize = ref(5);

const lectureList = ref([]);
const lectureCount = ref(0);

const handlerSearch = () => {
  const query = [];

  !searchTag.value || query.push(`searchTag=${searchTag.value}`);
  !searchTitle.value || query.push(`searchTtitle=${searchTitle.value}`);
  !searchStDate.value || query.push(`searchStDate=${searchStDate.value}`);
  !searchEdDate.value || query.push(`searchEdDate=${searchEdDate.value}`);
  !currentPage.value || query.push(`currentPage=${currentPage.value}`);
  !pageSize.value || query.push(`pageSize=${pageSize.value}`);

  const queryString = query.length > 0 ? `?${query.join('&')}` : '';

  router.push(queryString);
};

const route = useRoute();

const listSearch = () => {
  const param = new URLSearchParams(route.query);
  param.append('currentPage', currentPage.value);
  param.append('pageSize', pageSize.value);

  console.log(param);

  axios.post('/api/lecture/lectureListBody.do', param).then((res) => {
    lectureList.value = res.data.list;
    lectureCount.value = res.data.count;
  });
};

onMounted(() => {
  listSearch();
  window.location.search && router.replace(window.location.pathname);
});

watch(
  () => route.query,
  () => {
    listSearch();
  },
);
</script>

<template>
  <body>
    <div id="wrap_area">
      <div id="container">
        <ul>
          <li class="contents">
            <div class="content">
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
              <div class="divLectureList">
                <table class="col">
                  <colgroup>
                    <col width="25%" />
                    <col width="25%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">강의명</th>
                      <th scope="col">강사</th>
                      <th scope="col">강의 시작일</th>
                      <th scope="col">강의 종료일</th>
                      <th scope="col">정원</th>
                      <th scope="col">신청인원</th>
                      <th scope="col">강의실</th>
                    </tr>
                  </thead>
                  <tbody id="lectureList">
                    <template v-if="lectureCount > 0">
                      <tr
                        v-for="lecture in lectureList"
                        :key="lecture.lecId"
                        class="notice-table-row"
                      >
                        <td class="notice-cell">{{ lecture.lecName }}</td>
                        <td class="notice-cell cursor-pointer hover:underline">
                          <!-- @click="modalState.$patch(noticeDetail)" -->
                          {{ lecture.lecInstructorName }}
                        </td>
                        <td class="notice-cell">{{ lecture.lecStartDate.substr(0, 10) }}</td>
                        <td class="notice-cell">{{ lecture.lecEndDate.substr(0, 10) }}</td>
                        <td class="notice-cell">{{ lecture.lecPersonnel }}</td>
                        <td class="notice-cell">{{ lecture.courseCntPersonnel }}</td>
                        <td class="notice-cell">{{ lecture.lecRoomName }}</td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="7" class="notice-empty-row">일치하는 검색 결과가 없습니다</td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <!-- 페이징 처리  -->
                <!--<div class="paging_area" id="pageNavigation"></div>-->
                <PageNavigation
                  :total-items="currentPage"
                  :items-per-page="pageSize"
                  :on-page-change="listSearch"
                />
              </div>
            </div>

            <h3 class="hidden">풋터 영역</h3>
          </li>
        </ul>
      </div>
    </div>

    <!-- 모달팝업 -->
    <div
      id="lectureModal"
      class="layerPop layerType2"
      style="width: 780px; height: 680px; overflow: auto; display: none"
    >
      <input type="hidden" id="lecId" name="lecId" />
      <dl>
        <dt id="lectureModalTitle"></dt>
        <dd class="content" id="ddLectureModal">
          <!-- s : 여기에 내용입력 -->
          <div>
            <table class="row">
              <caption>
                caption
              </caption>

              <tbody>
                <tr>
                  <th colspan="4" scope="row" align="left">
                    <h2>강의 상세</h2>
                  </th>
                </tr>
                <tr>
                  <th scope="row">강의</th>
                  <td colspan="4">
                    <span
                      class="inputTxt p100"
                      name="lecName"
                      id="lecName"
                      style="width: 100px; font-size: 12px"
                    ></span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">강사</th>
                  <td>
                    <span
                      class="inputTxt p100"
                      name="lecInstructor"
                      id="lecInstructor"
                      style="width: 100px; font-size: 12px"
                    ></span>
                  </td>
                  <th scope="row">강의실<span class="font_red">*</span></th>
                  <td>
                    <span class="inputTxt p100" name="lecClassRoom" id="lecClassRoom"></span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">이메일</th>
                  <td>
                    <span class="inputTxt p100" name="insEmail" id="insEmail"></span>
                  </td>
                  <th scope="row">연락처</th>
                  <td>
                    <span class="inputTxt p100" name="insHp" id="insHp"></span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">강의 시작일</th>
                  <td>
                    <span
                      class="inputTxt p100"
                      name="lecStartDate"
                      id="lecStartDate"
                      style="width: 5px; font-size: 11px"
                    ></span>
                  </td>
                  <th scope="row">강의 종료일</th>
                  <td>
                    <span
                      class="inputTxt p100"
                      name="lecEndDate"
                      id="lecEndDate"
                      style="width: 5px; font-size: 11px"
                    ></span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">정원</th>
                  <td>
                    <span class="inputTxt p100" name="lecPersonnel" id="lecPersonnel"></span>
                  </td>
                  <th scope="row">강의 일수(주차)</th>
                  <td>
                    <span class="inputTxt p100" name="lecDaysCnt" id="lecDaysCnt"></span>(<span
                      class="inputTxt p100"
                      name="lecSectionCnt"
                      id="lecSectionCnt"
                    ></span
                    >주차)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div id="divLectureDetail">
            <table class="row">
              <caption>
                caption
              </caption>

              <tbody>
                <tr>
                  <th colspan="4" scope="row" align="left">
                    <h2>강의 계획</h2>
                  </th>
                </tr>
                <tr>
                  <th colspan="4" scope="row">강의목표<span class="font_red">*</span></th>
                </tr>
                <tr>
                  <td colspan="4">
                    <span
                      class="inputTxt"
                      name="lectureGoal"
                      id="lectureGoal"
                      style="resize: vertical; min-height: 50px"
                    ></span>
                  </td>
                </tr>
                <tr>
                  <th colspan="4" scope="row">강의내용<span class="font_red">*</span></th>
                </tr>
                <tr>
                  <td colspan="4">
                    <span
                      class="inputTxt"
                      name="lectureContent"
                      id="lectureContent"
                      style="resize: vertical; min-height: 50px"
                    ></span>
                  </td>
                </tr>
                <tr>
                  <th colspan="4" scope="row">강의기타사항<span class="font_red">*</span></th>
                </tr>
                <tr>
                  <td colspan="4">
                    <span
                      class="inputTxt"
                      name="lectureSpecifics"
                      id="lectureSpecifics"
                      style="resize: vertical; min-height: 50px"
                    ></span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">주차<span class="font_red">*</span></th>
                  <th scope="row">학습목표<span class="font_red">*</span></th>
                  <th scope="row">학습내용<span class="font_red">*</span></th>
                </tr>
              </tbody>
              <tbody id="trlectureWeekPlan"></tbody>
            </table>
          </div>
          <br />

          <!-- e : 여기에 내용입력 -->
          <div class="btn_areaC mt30">
            <a href="" class="btnType blue" id="btnRegisterLecture" name="btn" style="display: none"
              ><span>신청</span></a
            >
            <a href="" class="btnType gray" id="btnClose" name="btn"><span>취소</span></a>
          </div>
        </dd>
      </dl>
      <a href="" class="closePop"><span class="hidden">닫기</span></a>
    </div>
  </body>
</template>
<style lang="scss" scoped>
@import '/src/assets/css_bundle/common.css';
// @import '/src/assets/css_bundle/bootstrap-datepicker3.min.css';
// @import '/src/assets/css_bundle/bootstrap-datepicker3.standalone.css';
// @import '/src/assets/css_bundle/bootstrap-datepicker3.standalone.min.css';
// @import '/src/assets/css_bundle/custom_bootstrap.css';
// @import '/src/assets/css_bundle/font.css';
// @import '/src/assets/css_bundle/jquery-ui.css';
// @import '/src/assets/css_bundle/jquery-ui.min.css';
// @import '/src/assets/css_bundle/layout.css';
// @import '/src/assets/css_bundle/reset.css';
// @import '/src/assets/css_bundle/salarytable.css';
// @import '/src/assets/css_bundle/bootstrap-datepicker3.css';
// @import '/src/assets/css_bundle/salesplan.css';
// @import '/src/assets/css_bundle/style.css';
</style>
