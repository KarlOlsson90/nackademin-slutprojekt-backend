const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    shortDesc: String,
    longDesc: String,
    imgFile: String,
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;

/* 
/api/products/	GET	Returnerar en lista på samtliga produkter.
/api/products/:id	GET	Returnerar en enstaka produkt.
/api/products/	POST	Skapar en ny produkt, se produkt-modell. Enbart tillgänglig för admins
/api/products/:id	PATCH	Uppdaterar produkt, se produkt-modell. Enbart tillgänglig för admins
/api/products/:id	DELETE	Tar bort en produkt med :id. Enbart tillgänglig för admins 
*/

module.exports = {
  createProduct: async (product) => {
    return await Product.create(product);
  },
};
