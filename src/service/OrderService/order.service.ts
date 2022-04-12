export class OrderService {
  async checkOut(cartItems: []) {
    return new Promise((resolve, reject) => {
      try {
        // get list id of cart items;
        // count total price of cart items;
        //
      } catch (err) {
        reject(err);
      }
    });
  }
}
