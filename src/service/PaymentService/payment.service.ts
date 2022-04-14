import PaymentType from '../../models/Payment/paymentType.model';
import createError from 'http-errors';

// not finished
export class PaymentService {
  async findPaymentById(paymentId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = (await PaymentType.findByPk(paymentId)) as PaymentType;

        if (!payment) {
          const err = new createError.NotFound('Payment not found');
          reject(err);
          return;
        }
        resolve(payment.paymentType);
      } catch (err) {
        reject(err);
      }
    });
  }
}
