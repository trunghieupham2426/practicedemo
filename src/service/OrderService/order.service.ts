import CartItem from '../../models/Cart/cartitem.model';
import { Op } from 'sequelize';
import { UserService } from '../UserService/user.service';
import UserAddress from '../../models/User/userAddress.model';
import createError from 'http-errors';
import { PaymentService } from '../PaymentService/payment.service';
import Product from '../../models/ProductCateGory/product.model';
import { CartService } from '../CartService/cart.service';
export class OrderService {
  private userService: UserService = new UserService();
  private paymentService: PaymentService = new PaymentService();
  private cartService: CartService = new CartService();

  async checkOut(cartItemIds: string[], userId: string, paymentId: string) {
    // not finished
    return new Promise(async (resolve, reject) => {
      try {
        // get list items in cart ;
        const listItems = await CartItem.findAll({
          where: {
            id: {
              [Op.in]: cartItemIds,
            },
            //@ts-ignore
            userId: userId,
          },
        });

        if (!listItems) {
          throw new createError.NotFound('No item found in cart');
        }

        // get user delivery address
        const userAddress = (await this.userService.getUserAddress(
          userId
        )) as UserAddress;

        // get payment method
        const paymentMethod = await this.paymentService.findPaymentById(
          paymentId
        );

        // get total price
        let totalPrice = await this.cartService.countCartTotalPrice(
          cartItemIds
        );

        //create Order table ;

        resolve({ listItems, totalPrice });

        // count total price of cart items;
        //
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
