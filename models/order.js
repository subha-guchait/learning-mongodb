const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
});

module.exports = mongoose.model("Order", orderSchema);

// const mongodb = require("mongodb");

// const getDb = require("../util/database").getDb;

// const ObjectId = mongodb.ObjectId;

// class Order {
//   constructor(items, userId) {
//     this.items = items;
//     this.userId = userId;
//   }

//   createOrder() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .insertOne(this)
//       .then((result) => {
//         console.log(result);
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new ObjectId(this.userId) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch((err) => console.log(err));
//   }

//   static getOrders(userId) {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ userId: new ObjectId(userId) })
//       .toArray()
//       .then((orders) => {
//         console.log(orders);
//         return orders;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Order;
