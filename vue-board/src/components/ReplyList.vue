<template>
  <div class="reply-section">
    <h4>댓글 ({{ replies.length }})</h4>
    <ul v-if="replies.length > 0">
      <li v-for="reply in replies" :key="reply.idComments">
        <div class="reply-header">
          <span class="writer">{{ reply.writerComments }}</span>
          <span class="date">{{ formatDate(reply.dateComment) }}</span>
        </div>

        <!-- 수정 모드가 아닐 때 (isEditing(reply)가 false일 때) -->
        <p class="content" v-if="!isEditing(reply)">{{ reply.comment }}</p>

        <!-- 수정 폼 (isEditing(reply)가 true일 때) -->
        <div v-if="isEditing(reply)" class="edit-form-container">
          <textarea v-model="editingContent" rows="3"></textarea>
          <!-- 수정 저장 시, 현재 댓글 객체(reply)를 전달 -->
          <button @click="saveEdit(reply)">저장</button>
          <!-- 취소 버튼은 로컬 상태 초기화 -->
          <button @click="cancelEdit" class="cancel-btn">취소</button>
        </div>

        <!-- 액션 버튼 -->
        <div class="reply-actions" v-if="!isEditing(reply)">
          <!-- canEditDelete 함수에 댓글 작성자 전달 -->
          <template v-if="canEditDelete(reply.writerComments)">
            <button @click="startEdit(reply)" class="edit-btn">수정</button>
            <button @click="deleteReplyHandler(reply.idComments)" class="delete-btn">삭제</button>
          </template>
        </div>
      </li>
    </ul>
    <p v-else class="no-replies">등록된 댓글이 없습니다.</p>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useReplyStore } from "@/stores/reply";

const props = defineProps({
  boardId: {
    type: [Number, String],
    required: true,
  },
  replies: {
    type: Array,
    required: true,
  },
});

const authStore = useAuthStore();
const replyStore = useReplyStore();
const { currentWriter, authority } = storeToRefs(authStore); // authority 게터 추가 추출

//  새로운 로컬 상태: 현재 수정 중인 댓글의 ID와 내용
const editingCommentId = ref(null);
const editingContent = ref("");

// 현재 댓글이 수정 모드인지 확인하는 Computed Property
const isEditing = (reply) => editingCommentId.value === reply.idComments;

// [핵심 수정] 권한 체크: 관리자 권한 오버라이드 추가
const canEditDelete = (replyWriter) => {
  // 1. 로그인하지 않았다면 권한 없음
  if (!currentWriter.value) {
    return false;
  }

  // 2. [관리자 오버라이드] 권한이 'admin'이면 무조건 true 반환
  if (authority.value === "admin") {
    // console.log("관리자 권한으로 수정/삭제 가능"); // 디버깅용
    return true;
  }

  // 3. [일반 사용자] 본인의 댓글인지 확인
  return currentWriter.value === replyWriter;
};

// 댓글 삭제 핸들러
const deleteReplyHandler = async (idComments) => {
  // Canvas 환경에서는 confirm 대신 커스텀 모달 UI를 사용해야 하지만, 현재는 confirm을 유지하고 설명만 추가합니다.
  if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
    try {
      // boardId는 props.boardId를 사용해야 합니다.
      await replyStore.deleteReply(idComments, props.boardId);
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      // alert("댓글 삭제에 실패했습니다."); // alert 대신 커스텀 메시지 권장
    }
  }
};

// 날짜 포맷팅
const formatDate = (dateString) => {
  if (!dateString) return "날짜 정보 없음";
  // toLocaleString을 사용하여 사용자의 환경에 맞는 날짜 및 시간 형식으로 변환
  return new Date(dateString).toLocaleString();
};

// 수정 시작
const startEdit = (reply) => {
  editingCommentId.value = reply.idComments; // ID 설정
  editingContent.value = reply.comment; // 현재 내용으로 폼 초기화
};

// 수정 취소 (로컬 상태 초기화)
const cancelEdit = () => {
  editingCommentId.value = null;
  editingContent.value = "";
};

// 수정 저장
const saveEdit = async (reply) => {
  // 로컬 상태인 editingContent.value를 검사
  if (!editingContent.value.trim()) {
    // alert("댓글 내용을 입력해주세요."); // alert 대신 커스텀 메시지 권장
    console.warn("댓글 내용을 입력해주세요.");
    return;
  }

  const updatedReplyData = {
    idComments: reply.idComments,
    comment: editingContent.value, // 로컬 상태의 수정된 내용을 사용
    board_id: props.boardId,
  };

  try {
    await replyStore.updateReply(updatedReplyData);

    // 수정 성공 후, 로컬 수정 상태 해제
    cancelEdit();
  } catch (error) {
    console.error("댓글 수정 중 오류 발생:", error);
    // alert("댓글 수정에 실패했습니다."); // alert 대신 커스텀 메시지 권장
  }
};
</script>

<style scoped>
/* (이전 스타일 유지) */

/* 댓글 섹션 전체 스타일 */
.reply-section {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

/* 댓글 제목 */
h4 {
  font-size: 1.5rem;
  color: #2c3e50;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* 댓글 목록 */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 개별 댓글 항목 */
li {
  padding: 15px 0;
  border-bottom: 1px dashed #e0e0e0;
}

li:last-child {
  border-bottom: none;
}

/* 댓글 헤더 (작성자, 날짜) */
.reply-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.writer {
  font-weight: bold;
  color: #42b983;
}

.date {
  color: #999;
}

/* 댓글 내용 */
.content {
  color: #333;
  margin-bottom: 10px;
  line-height: 1.5;
  white-space: pre-wrap;
}

/* 댓글 액션 버튼 그룹 */
.reply-actions {
  text-align: right;
}

/* 액션 버튼 공통 */
.reply-actions button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-left: 8px;
  transition: opacity 0.2s;
}

.reply-actions button:hover {
  opacity: 0.8;
}

/* 수정 버튼 */
.edit-btn {
  background-color: #3498db;
  color: white;
}

/* 삭제 버튼 */
.delete-btn {
  background-color: #e74c3c;
  color: white;
}

/* 등록된 댓글이 없을 때 */
.no-replies {
  text-align: center;
  color: #777;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

/* 수정 폼 스타일 */
.edit-form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
}
.edit-form-container textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  box-sizing: border-box;
}
.edit-form-container button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end; /* 버튼을 오른쪽으로 배치 */
}
.edit-form-container button:nth-of-type(1) {
  /* 저장 버튼 */
  background-color: #42b983;
  color: white;
}
.edit-form-container .cancel-btn {
  background-color: #95a5a6;
  color: white;
  margin-left: 10px;
}
</style>
