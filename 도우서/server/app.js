const express = require("express");
const mysql = require("./sql/index");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 게시판

//전체 조회
app.get("/boards", async (req, res) => {
  let sql = `select * from board_tbl`;
  let result = await mysql.queryExecute(sql, []);
  res.send(result);
});
// 단건 조회
app.get("/board/id", async (req, res) => {
  const id = req.params.id;
  let sql = `select * from board_tbl where id=?`;
  let result = await mysql.queryExecute(sql, [id]);
  res.send(result);
});

//등록
app.post("/board", async (req, res) => {
  const param = req.body.params;
  let sql = `insert into board_tbl set ?`;
  let result = await mysql.queryExecute(sql, [param]);
  res.send(result);
});

//수정
app.put("/board", async (req, res) => {
  const data = req.body.params;
  let sql = `update board_tbl set title=?,content=? where id=?`;
  const param = [data.title, data.writer, data.CONTENT, data.CREATED_DT];
  let result = await mysql.queryExecute(sql, [param]);
  res.send(result);
});
//삭제
app.delete("/board/:id", async (req, res) => {
  const id = req.params.id;
  let sql = `delete from board_tbl where id=?`;
  let result = await mysql.queryExecute(sql, [param]);
  res.send(result);
});

//댓글
//게시글의 댓글 조회
app.get("/board/:bno/comments", async (req, res) => {
  const id = req.params.bno;
  console.log(id);
  let sql = `select * from comment_tbl where bno=? order by no asc`;
  let result = await mysql.queryExecute(sql, [id]);
  res.send(result);
});
app.post("/board/:bno/comments", async (req, res) => {
  const id = req.params.bno;
  console.log(id);
  let sql = `select count(*) from comment_tbl where bno=?`;
  let result = await mysql.queryExecute(sql, [id]);
  res.send(result);
});
//등록
app.post("/comment", async (req, res) => {
  const param = req.body.params;
  let sql = `insert into comment_tbl set ? `;
  let result = await mysql.queryExecute(sql, [param]);
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port} start`);
});
