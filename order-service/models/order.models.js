const { Schema, models, model, Types } = require("mongoose");

const orderSchema = new Schema(
  {
    products: {
      type: [
        {
          _id: Types.ObjectId,
        },
      ],
    },
    userEmail: String,
    totalPrice: Number,
  },
  { versionKey: false, timestamps: true }
);

const OrderModel = models.Order || model("Order", orderSchema);

module.exports = {
  OrderModel,
};
