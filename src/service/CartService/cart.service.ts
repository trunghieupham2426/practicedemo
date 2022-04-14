import Cart from '../../models/Cart/cart.model';
import CartItem from '../../models/Cart/cartitem.model';
import Product, {
  productStatusEnum,
} from '../../models/ProductCateGory/product.model';
import { ProductService } from '../ProductService/product.service';
import createError from 'http-errors';
import { sequelize } from '../../../sequelize';

export class CartService {
  private productService: ProductService = new ProductService();

  async getUserCart(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const [cart, created] = await Cart.findOrCreate({
          where: { userId },
          defaults: {
            userId,
          },
          include: {
            model: Product,
            through: {
              attributes: ['quantity'],
            },
          },
        });

        resolve(cart);
      } catch (err) {
        reject(err);
      }
    });
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    return new Promise(async (resolve, reject) => {
      try {
        // get user cart
        const cart = (await this.getUserCart(userId)) as Cart;

        // check status of product
        const product = (await Product.findByPk(productId)) as Product;

        if (!product) {
          throw new createError.NotFound('No product found with this id');
        }

        if (product.productStatus === productStatusEnum.INACTIVE) {
          throw new createError.BadRequest('This product not active');
        }

        //check invalid quantity
        if (quantity <= 0) {
          throw new createError.BadRequest('Quantity must be greater than 0');
        }

        //check if remain stock is enough
        if (product.unitsInStock - product.unitsOnOrder < quantity) {
          throw new createError.BadRequest(
            'Not enough stock, please reduce quantity'
          );
        }

        // find cart item
        const cartItem = await CartItem.findOne({
          where: {
            productId: productId,
            userId: cart.userId,
          },
        });

        // if cart item already in cart ,then update quantity
        if (cartItem) {
          cartItem.quantity = quantity;
          cartItem.save();

          resolve(cartItem);
          return;
        }

        // if no cart item then create cart Item;
        const newCartItem = await CartItem.create({
          userId: cart.userId,
          productId: productId,
          quantity: quantity,
        });

        resolve(newCartItem);
      } catch (err) {
        reject(err);
      }
    });
  }

  async removeCartItem(cartItemId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const cartItem = await CartItem.findByPk(cartItemId);

        if (!cartItem) {
          throw new createError.NotFound('No cart item found with this id');
        }

        await cartItem.destroy();

        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  async countCartTotalPrice(cartId: string[]) {
    return new Promise(async (resolve, reject) => {
      //test test
      try {
        const totalPrice = await sequelize.query(
          `SELECT SUM( ci.quantity * pr.price) as totalPrice FROM cartitem ci
        JOIN product pr
        ON ci.productId = pr.id
        WHERE ci.id in (?) ;`,
          {
            replacements: [cartId],
            //@ts-ignore
            type: sequelize.QueryTypes.SELECT,
          }
        );
        //@ts-ignore
        resolve(totalPrice[0].totalPrice);
      } catch (err) {
        reject(err);
      }
    });
  }
}
