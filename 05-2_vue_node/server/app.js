const express = require("express");
const mysql = require("./sql/index");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//전체 조회
app.get("/books", async (req, res) => {
  let sql = `select * from book_tbl`;
  let result = await mysql.queryExecute(sql, []);
  res.send(result);
});
// 단건 조회
app.get("/book/:no", async (req, res) => {
  const id = req.params.no;
  let sql = `select * from book_tbl where no=?`;
  let result = await mysql.queryExecute(sql, [id]);
  res.send(result);
});

//등록
app.post("/book", async (req, res) => {
  const params = req.body;
  console.log(params)
  let sql = `insert into book_tbl set ?`;
  let result = await mysql.queryExecute(sql, [params]);
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port} start`);
});
