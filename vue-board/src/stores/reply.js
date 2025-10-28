import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useReplyStore = defineStore("reply", () => {
  // 상태 (State) - 게시글 ID 별 댓글을 저장하는 맵 구조
  const replies = ref({}); // { board_id: [reply1, reply2, ...], ... }

  // 게터 (Getter)
  const getRepliesByBoardId = (boardId) => {
    return replies.value[boardId] || [];
  };

  // 액션 (Actions)

  // 1. 댓글 목록 조회
  const fetchReplies = async (boardId) => {
    try {
      // 예시: GET http://localhost:3000/board/1/replies
      const response = await axios.get(`${BASE_URL}/board/${boardId}/replies`);
      // 데이터가 없는 경우를 대비하여 빈 배열로 초기화
      replies.value[boardId] = response.data || [];
      console.log(`${boardId}번 글의 댓글을 성공적으로 불러왔습니다.`);
    } catch (error) {
      console.error("댓글 목록 조회 실패:", error);
      replies.value[boardId] = [];
    }
  };

  // 2. 댓글 추가
  const addReply = async (newReply) => {
    // newReply = { comment, writerComments, board_id }
    try {
      const response = await axios.post(`${BASE_URL}/reply`, { param: newReply });
      const addedReply = {
        ...newReply,
        idComments: response.data.insertId,
        dateComment: new Date().toISOString(), // 임시 날짜 설정 (서버 응답을 사용하는 것이 가장 좋음)
      };

      const boardId = newReply.board_id;
      if (!replies.value[boardId]) {
        replies.value[boardId] = [];
      }
      replies.value[boardId].push(addedReply);
      console.log("댓글 추가 성공:", addedReply);
    } catch (error) {
      console.error("댓글 추가 실패:", error);
      throw error;
    }
  };

  // 3. 댓글 삭제
  const deleteReply = async (idComments, boardId) => {
    try {
      await axios.delete(`${BASE_URL}/reply/${idComments}`);

      // 로컬 상태 업데이트
      replies.value[boardId] = replies.value[boardId].filter(
        (reply) => reply.idComments !== idComments,
      );
      console.log(`${idComments}번 댓글 삭제 성공`);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      throw error;
    }
  };

  // 4. 댓글 수정 (간단한 로직만 구현)
  const updateReply = async (updatedReply) => {
    // updatedReply = { idComments, comment, board_id, ... }
    try {
      await axios.put(`${BASE_URL}/reply`, { param: updatedReply });

      const boardId = updatedReply.board_id;
      const index = replies.value[boardId].findIndex(
        (r) => r.idComments === updatedReply.idComments,
      );

      if (index !== -1) {
        // 로컬 상태 업데이트
        replies.value[boardId][index] = {
          ...replies.value[boardId][index],
          comment: updatedReply.comment,
          // 수정 시 dateComment도 업데이트하는 로직은 백엔드에서 처리하는 것이 좋음
        };
        console.log("댓글 수정 성공:", updatedReply.idComments);
      }
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      throw error;
    }
  };

  return { replies, getRepliesByBoardId, fetchReplies, addReply, deleteReply, updateReply };
});
