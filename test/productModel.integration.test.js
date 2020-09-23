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

    const arrangedProduct1 = 
      {
        title: "String 1",
        price: 1,
        shortDesc: "String 1",
        longDesc: "String 1",
        imgFile: "String 1",
      },
      arrangedProduct2 = 
      {
        title: "String 2",
        price: 1,
        shortDesc: "String 2",
        longDesc: "String 2",
        imgFile: "String 2",
      };

    const product1 = await Product.createProduct(arrangedProduct1);
    const product2 = await Product.createProduct(arrangedProduct2);
    this.products = [product1, product2];
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
        expect(res.body).to.be.a("object");
        expect(res.body.price).to.equal(1010);
      });
  });

  it("should get all products", async () => {

    // Act
    await chai
      .request(app)
      .get("/products")
      .then((res) => {

        // Assert
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0].price).to.equal(1)
        expect(res.body.length).to.equal(2)
      });
  });

  it("should get a product", async () => {

    // Act
    await chai
      .request(app)
      .get(`/products/${this.products[0]._id}`)
      .then((res) => {

        // Assert
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.price).to.equal(1)
      });
  });

  it("should delete a product", async () => {

    // Act
    await chai
      .request(app)
      .delete(`/products/${this.products[0]._id}`)
      .then( async (res) => {

        const product = await Product.getProduct(this.products[0]._id);

        // Assert
        expect(res).to.have.status(200);
        expect(product).to.equal(null)
      });
  });

  it("should update a product", async () => {
    let newProduct = {
      title: "String 1",
      price: 10,
      shortDesc: "String 1",
      longDesc: "String 1",
      imgFile: "String 1",
    }
    // Act
    await chai
      .request(app)
      .patch(`/products/${this.products[0]._id}`)
      .send({
        newProduct
      })
      .then( async (res) => {
        
        const product = await Product.getProduct(this.products[0]._id);

        expect(res).to.have.status(200);
        expect(product.price).to.equal(10)
      });
  });
});
