// 실제 기능을 담당하는 함수들의 모음
const mysql = require("../database/mapper.js");

// 실제 제공할 서비스 등록

//전체 조회
const findAll = async () => {
  let list = await mysql.query("selectboardList").catch((err) => {
    console.log(err);
    return { err: "DB조회중 오류 발생" };
  });
  return list;
};
// 단건 조회
const findByNo = async (boardNo) => {
  let list = await mysql.query("selectboardOne", boardNo).catch((err) => {
    console.log(err);
    return { err: "DB조회 중 오류 발생" };
  });
  let info = list[0];
  return info;
};
//등록
const createBoard = async (boardInfo) => {
  //[title, writer, content , created_dt]
  const selected = [title, writer, content, created_dt];
  let insertData = getInsertInfo(boardInfo, selected);
  // let insertData = getInsertInfo(boardInfo);
  let result = await mysql.query("boardInsert", insertData).catch((err) => {
    console.log(err);
  });
  let resObj = {};
  if (result.insertId > 0) {
    //AUTO_INCREMENT가 적용된 PK값이 변환 insertId가 자동 등록됨
    resObj = { result: true, bno: result.insertId };
  } else {
    resObj = { result: false };
  }
  return resObj;
};
// function getInsertInfo(info) {
//   let aray = [];
//   aray.push(info.title);
//   aray.push(info.writer);
//   aray.push(info.content);
//   aray.push(info.created_dt);
//   return aray;
// }

function getInsertInfo(target, selected) {
  let info = [];
  for (let column of selected) {
    let value = target[column];
    info.push(value);
  }
  return info;
}

//수정
const boardUpdate = async (no, boardInfo) => {
  const params = [boardInfo, no];
  let result = await mysql.query("boardUpdate", params).catch((err) => {
    console.log(err);
  });
  let resObj = {};
  if (result.affectedRows > 0) {
    resObj = { result: true, affectedRows: no };
  } else {
    resObj = { result: false };
  }
  return resObj;
};

// const boardUpdate = async (boardInfo) => {
//   console.log(boardInfo);

//   // 1. WHERE 절에 사용할 게시글 번호(PK) 추출
//   const boardNo = boardInfo.no;

//   // 2. SET 절에 사용할 업데이트 객체 생성 (no, created_dt와 같은 불필요한 필드는 제외하거나,
//   //    여기서는 no만 명시적으로 제외하고 DB에 전달. created_dt는 DB에서 업데이트되지 않는다고 가정)
//   const updateObject = {
//     title: boardInfo.title,
//     writer: boardInfo.writer,
//     content: boardInfo.content,
//     created_dt: boardInfo.created_dt,
//     // created_dt는 보통 수정하지 않으므로 포함하지 않는 것이 일반적입니다.
//     // 만약 updated_dt 컬럼을 사용한다면 여기에 추가합니다.
//   };

//   // 3. DB 쿼리에 전달할 매개변수 배열 구성: [업데이트 객체, WHERE 값]
//   const params = [updateObject, boardNo];

//   // 4. DB 쿼리 실행 ('boardUpdate'는 쿼리 파일에 정의된 이름)
//   let result = await mysql.query("boardUpdate", params).catch((err) => {
//     console.log(err);
//     return { err: "DB 수정 중 오류 발생" };
//   });

//   // 5. 결과 반환 (MariaDB 드라이버는 업데이트 성공 시 affectedRows를 반환)
//   let resObj = {};
//   if (result && result.affectedRows > 0) {
//     resObj = { result: true, affectedRows: result.affectedRows };
//   } else {
//     resObj = { result: false };
//   }
//   return resObj;
// };
//삭제

module.exports = { findAll, findByNo, createBoard, boardUpdate };
