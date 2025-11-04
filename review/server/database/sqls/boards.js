// Table : board_tbl

// 각 변수별로 SQL문을 등록할 떄 백틱(``)을 사용하는 이유는 줄바꿈 허용을 허용하기 떄문.
// ( 따옴표는 줄을 바꿀 경우 값이 깨지면서 에러발생 )

// 조건없이 전체조회
const selectboardList = `
SELECT no
	, title
	, writer
	, content
	, created_dt
	, updated_dt
  , ( SELECT COUNT(no) FROM comment_tbl WHERE bno = b.no) comment_count
FROM board_tbl b
ORDER bY no`;

// PRIMARY KEY를 활용한 단건조회
const selectboardOne = `
SELECT no
	, title
	, writer
	, content
	, created_dt
	, updated_dt
FROM board_tbl
WHERE no = ?`;

// 등록
const boardInsert = `
INSERT INTO board_tbl ( title, writer, content, created_dt)
VALUES ( ?, ?, ?, ? )`;

// 수정
const boardUpdate = `
UPDATE board_tbl
SET ?
WHERE no = ?`;

// PRIMARY KEY를 활용한 삭제
const boardDelete = `
DELETE FROM board_tbl
WHERE no = ?`;

module.exports = {
  selectboardList,
  selectboardOne,
  boardInsert,
  boardUpdate,
  boardDelete,
};
