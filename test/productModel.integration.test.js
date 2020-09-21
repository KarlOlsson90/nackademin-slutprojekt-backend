const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const Database = require("../database/mongodb");
const Product = require("../models/productModels");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

describe("Product Model Integration", () => {
  before("Connect to database before running the test", async () => {
    await Database.connect();
  });

  beforeEach("Clear database before running each test", async () => {
    await Product.deleteAllProducts();
  });

  after("Disconnect from database after running the test", async () => {
    await Database.disconnect();
  });

  it("should create a product", async () => {
    const product = {
      title: "String",
      price: 1010,
      shortDesc: "String",
      longDesc: "String",
      imgFile: "String",
    };

    await chai
      .request(app)
      .post("/products")
      .set("Content-type", "application/json")
      .send(product)
      .then((res) => {
        expect(res).to.have.status(201);
        res.body.should.be.a("object");
      });
  });
});
