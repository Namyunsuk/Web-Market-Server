const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json()); //express서버에서 json형식의 정보를 처리하도록 함
app.use(cors()); //모든 브라우저에서 내  서버에 요청할 수 있음

app.get("/products", (req, res) => {
  const query = req.query;
  console.log("Query: ", query);
  res.send({
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  res.send(`id는 ${id}입니다.`);
});

app.post("/products", (req, res) => {
  const body = req.body;
  res.send({
    body: body,
  });
});

app.listen(port, () => {
  console.log("server is working");
});
