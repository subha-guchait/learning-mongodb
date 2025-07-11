const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class Order {
  constructor(items, userId) {
    this.items = items;
    this.userId = userId;
  }

  createOrder() {
    const db = getDb();
    return db
      .collection("orders")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this.userId) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch((err) => console.log(err));
  }

  static getOrders(userId) {
    const db = getDb();
    return db
      .collection("orders")
      .find({ userId: new ObjectId(userId) })
      .toArray()
      .then((orders) => {
        console.log(orders);
        return orders;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Order;
