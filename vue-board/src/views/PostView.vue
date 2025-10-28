<template>
  <div class="post-detail-container">
    <h3>상세화면</h3>
    <div v-if="post" class="post-content-card">
      <h3>제목: {{ post.title }}</h3>
      <p class="post-body">내용: {{ post.content }}</p>

      <div class="post-meta">
        <p>
          <em>작성자: {{ post.writer }}</em>
        </p>
        <p>작성일시: {{ writeDate }}</p>
      </div>

      <!-- 액션 버튼 영역: 권한 체크에 따라 표시 -->
      <div class="action-area">
        <template v-if="canEditDelete">
          <!-- 수정 버튼: ModifyView로 라우팅 -->
          <RouterLink
            :to="{ name: 'ModifyView', params: { id: post.id } }"
            class="action-btn edit-btn"
            >수정</RouterLink
          >
          <!-- 삭제 버튼 -->
          <button @click="deletePostHandler" class="action-btn delete-btn">삭제</button>
        </template>
        <RouterLink to="/" class="action-btn back-link">목록으로</RouterLink>
      </div>

      <!-- 권한 안내 메시지 (디버깅용) -->
      <div v-if="!canEditDelete && authStore.currentWriter" class="permission-hint">
        <p>
          이 글은 작성자({{ post.writer }})만 수정/삭제할 수 있습니다. (현재 사용자:
          {{ authStore.currentWriter }})
        </p>
      </div>
      <div v-else-if="!canEditDelete && !authStore.currentWriter" class="permission-hint">
        <p>수정 및 삭제를 위해서는 로그인이 필요합니다.</p>
        <RouterLink to="/login" class="login-link">로그인 하러가기</RouterLink>
      </div>
    </div>

    <!-- 댓글 영역 컴포넌트 추가 -->
    <template v-if="post">
      <ReplyForm :boardId="post.id" @reply-added="fetchReplies" />
      <ReplyList :replies="replies" :boardId="post.id" />
    </template>
  </div>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth"; // Auth Store 추가
import { useReplyStore } from "@/stores/reply"; // Reply Store 추가
import ReplyForm from "@/components/ReplyForm.vue";
import ReplyList from "@/components/ReplyList.vue";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

// Store 사용
const postStore = usePostStore();
const authStore = useAuthStore(); // Auth Store 인스턴스
const replyStore = useReplyStore(); // Reply Store 인스턴스

// 게시글 데이터: Pinia Store의 Getter를 사용하여 게시글 ID로 찾기
const post = computed(() => {
  return postStore.getPostById(postId);
});

// 댓글 데이터: Pinia Store의 Getter를 통해 가져오기
const replies = computed(() => {
  return replyStore.getRepliesByBoardId(postId);
});

// PostView.vue 또는 해당 권한 체크 로직이 있는 컴포넌트
const canEditDelete = computed(() => {
  // 1. 게시글이 없거나 로그인하지 않았다면 권한 없음
  if (!post.value || !authStore.isLoggedIn) {
    return false;
  }

  // 2. [관리자 오버라이드] 현재 사용자의 권한이 'admin'이면 무조건 true 반환
  console.log("관리자" + authStore.authority);
  if (authStore.authority === "admin") {
    return true;
  }

  // 3. [일반 사용자] 관리자가 아니라면, 본인이 작성한 글인지 확인
  return post.value.writer === authStore.currentWriter;
});

const writeDate = computed(() => {
  if (post.value && post.value.write_date) {
    return new Date(post.value.write_date).toLocaleString();
  }
  return "";
});

// 댓글 목록을 가져오는 함수
const fetchReplies = () => {
  // replyStore의 fetchReplies 액션을 호출
  replyStore.fetchReplies(postId);
};

onBeforeMount(async () => {
  // 게시글이 Pinia Store에 없으면 전체 목록을 가져와서 채웁니다.
  if (!postStore.posts.length) {
    await postStore.fetchPosts();
  }
  // 댓글 데이터 로드
  fetchReplies();
});

// 삭제 핸들러
const deletePostHandler = async () => {
  if (!canEditDelete.value) {
    // UI에서 버튼을 숨겼더라도 안전하게 다시 한 번 권한 체크
    alert("삭제 권한이 없습니다.");
    return;
  }

  if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
    try {
      await postStore.deletePost(postId);
      router.push("/");
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  }
};
</script>

<style scoped>
/* (이전 스타일 유지 및 보완) */

.post-detail-container {
  max-width: 800px;
  margin: 40px auto;
}

/* 카드 형식의 게시글 내용 */
.post-content-card {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid green;
  margin-bottom: 20px;
}

/* 제목 */
h3:nth-of-type(2) {
  font-size: 1.8rem;
  color: #2c3e50;
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
}

/* 내용 */
.post-body {
  font-size: 1.1rem;
  color: #333;
  min-height: 100px;
  padding: 20px 0;
  white-space: pre-wrap;
  border-bottom: 1px dashed #ddd;
}

/* 메타 정보 */
.post-meta {
  text-align: right;
  padding-top: 10px;
}

.post-meta p {
  font-size: 0.9rem;
  color: #777;
  margin: 5px 0;
}

em {
  font-style: normal;
  font-weight: bold;
  color: #42b983;
}

/* 액션 버튼 영역 */
.action-area {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

/* 액션 버튼 공통 스타일 */
.action-btn {
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 수정 버튼 스타일 */
.edit-btn {
  background-color: #3498db;
  color: white;
  border: 1px solid #3498db;
}

.edit-btn:hover {
  background-color: #2980b9;
}

/* 삭제 버튼 스타일 */
.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #c0392b;
}

/* 목록으로 링크 스타일 */
.back-link {
  background-color: #95a5a6;
  color: white;
  border: none;
}
.back-link:hover {
  background-color: #7f8c8d;
}

/* 권한 안내 메시지 */
.permission-hint {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 8px;
  color: #856404;
  font-size: 0.9rem;
  text-align: center;
}
.permission-hint .login-link {
  display: inline-block;
  margin-left: 10px;
  color: #856404;
  font-weight: bold;
  text-decoration: underline;
}
</style>
