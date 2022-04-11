import Cart from '../../models/Cart/cart.model';
import CartItem from '../../models/Cart/cartitem.model';
import Product, {
  productStatusEnum,
} from '../../models/ProductCateGory/product.model';
import { ProductService } from '../ProductService/product.service';
import createError from 'http-errors';
import { Sequelize } from 'sequelize-typescript';
import { Op, fn, col, where } from 'sequelize';
import { sequelize } from '../../../sequelize';

export class CartService {
  private productService: ProductService = new ProductService();

  async getUserCart(userId: string) {
    return new Promise(async (result, reject) => {
      try {
        const [cart, created] = await Cart.findOrCreate({
          where: { userId },
          defaults: {
            userId,
          },
          include: [Product],
        });

        result(cart);
      } catch (err) {
        reject(err);
      }
    });
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    return new Promise(async (result, reject) => {
      try {
        // get user cart
        const cart = (await this.getUserCart(userId)) as Cart;

        // check status of product
        const product = (await this.productService.getProductDetail(
          productId
        )) as Product;

        if (product.productStatus === productStatusEnum.INACTIVE) {
          reject(new createError.BadRequest('This product not active'));
          return;
        }

        // find cart item
        const cartItem = await CartItem.findOne({
          where: {
            productId: productId,
            cartId: cart.id,
          },
        });

        // if cart item already in cart ,then update quantity
        if (cartItem) {
          cartItem.quantity = quantity;
          cartItem.save();
          result(cartItem);
          return;
        }

        // if no cart item then create cart Item;
        const newCartItem = await CartItem.create({
          cartId: cart.id,
          productId: productId,
          quantity: 1,
        });

        result(newCartItem);
      } catch (err) {
        reject(err);
      }
    });
  }

  async removeCartItem(cartItemId: string) {
    return new Promise(async (result, reject) => {
      try {
        const cartItem = await CartItem.findByPk(cartItemId);

        if (!cartItem) {
          return reject(
            new createError.NotFound('No cart item found with this id')
          );
        }

        await cartItem.destroy();

        result(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  async countCartTotalPrice() {
    return new Promise(async (result, reject) => {
      //test test
      try {
        const results = await CartItem.findAll({
          where: { cartId: 1 },
          //@ts-ignore
          attributes: [Sequelize.fn('sum', Sequelize.col('quantity'))],
          include: [
            {
              model: Product,
            },
          ],
        });

        result(results);
      } catch (err) {
        reject(err);
      }
    });
  }
}
