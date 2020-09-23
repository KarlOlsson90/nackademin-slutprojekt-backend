const chai = require("chai");
const chaiHttp = require("chai-http");
const Database = require("../database/mongodb");
const Product = require("../models/productModels");
const app = require("../app");

chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe("Integration Testing - Product Model", () => {
  before("Connect to database before running the test", async () => {
    await Database.connect();
  });

  beforeEach("Clear database before running each test", async () => {
    await Product.deleteAllProducts();

    const arrangedProducts = [
      {
        title: "String 1",
        price: 1,
        shortDesc: "String 1",
        longDesc: "String 1",
        imgFile: "String 1",
      },
      {
        title: "String 2",
        price: 1,
        shortDesc: "String 2",
        longDesc: "String 2",
        imgFile: "String 2",
      },
    ];

    const products = await Product.createProduct(arrangedProducts);
    this.products = products;
  });

  after("Disconnect from database after running the test", async () => {
    await Database.disconnect();
  });

  it("should create a product", async () => {
    // Arrange
    const product = {
      title: "String",
      price: 1010,
      shortDesc: "String",
      longDesc: "String",
      imgFile: "String",
    };

    // Act
    await chai
      .request(app)
      .post("/products")
      .set("Content-type", "application/json")
      .send(product)
      .then((res) => {

        // Assert
        expect(res).to.have.status(201);
        res.body.should.be.a("object");
      });
  });

  it("should get all products", async () => {
    // Arrange
    const arrangedProducts = [
      {
        _id: "5f686467fab56c53dcacfb25",
        title: "String 1",
        price: 1,
        shortDesc: "String 1",
        longDesc: "String 1",
        imgFile: "String 1",
      },
      {
        _id: "5f68648c49227a2510a68eb2",
        title: "String 2",
        price: 1,
        shortDesc: "String 2",
        longDesc: "String 2",
        imgFile: "String 2",
      },
    ];

    await Product.createProduct(arrangedProducts);

    // Act
    await chai
      .request(app)
      .get("/products")
      .then((res) => {

        // Assert
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

  it("should get a product", async () => {
    // Arrange
    const arrangedProduct = {
      _id: "5f68648c49227a2510a68eb2",
      title: "String",
      price: 1010,
      shortDesc: "String",
      longDesc: "String",
      imgFile: "String",
    };

    await Product.createProduct(arrangedProduct);

    // Act
    await chai
      .request(app)
      .get(`/products/${arrangedProduct._id}`)
      .then((res) => {

        // Assert
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

  it("should get a product", async () => {
    // Arrange
    const arrangedProduct = {
      _id: "5f68648c49227a2510a68eb2",
      title: "String",
      price: 1010,
      shortDesc: "String",
      longDesc: "String",
      imgFile: "String",
    };

    // Act
    await chai
      .request(app)
      .get(`/products/${arrangedProduct._id}`)
      .then((res) => {

        // Assert
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

});
