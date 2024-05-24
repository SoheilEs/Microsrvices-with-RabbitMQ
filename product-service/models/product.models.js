const { Schema, models, model } = require("mongoose");

const productSchema = new Schema({
    title: String,
    description: String,
    price : Number
},{
    versionKey: false,
    timestamps: true
})

const ProductModel = models.Product || model("Product",productSchema)


module.exports = {
    ProductModel
}