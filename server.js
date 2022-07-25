const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const port = 8080;

app.use(express.json()); //express서버에서 json형식의 정보를 처리하도록 함
app.use(cors()); //모든 브라우저에서 내  서버에 요청할 수 있음

app.get("/products", (req, res) => {
  //product테이블의 모든 데이터를 가져옴
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "createdAt", "seller"], //해당 칼럼 들만 가져온다(불필요한 값들은 X)
  })
    .then((result) => {
      console.log("Products: ", result);
      res.send({
        products: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.send("Error");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("product: ", result);
      res.send({
        product: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.send("Error");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller } = body;
  if (!name || !description || !price || !seller) {
    res.send("Please write the all field");
  }
  //Product 테이블에 값을 create해줌
  models.Product.create({
    name: name, // 그냥 name만 해도 같은 의미
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("Result: ", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.send("상품 업로드에 문제가 발생하였습니다.");
    });
});

app.listen(port, () => {
  console.log("server is working");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB not connected");
      process.exit();
    });
});
