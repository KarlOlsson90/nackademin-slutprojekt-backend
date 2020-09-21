const chai = require("chai");
chai.should();
const Database = require("../database/mongodb");
const Product = require("../models/productModels");

describe("Product Model", () => {
  beforeEach(async () => {
    await Database.connect();
  });

  it("should create a product", async () => {
    // Arrange
    const arrangedProduct = {
      title: "String",
      price: 1,
      shortDesc: "String",
      longDesc: "String",
      imgFile: "String",
    };

    // Act
    const result = await Product.createProduct(arrangedProduct);
    
    // Assert
    result.should.be.an("object");
    result.should.have.property("title");
    result.should.have.property("price");
    result.should.have.property("shortDesc");
    result.should.have.property("longDesc");
    result.should.have.property("imgFile");
    result.should.have.property("createdAt");
    result.should.have.property("updatedAt");
  });


});
