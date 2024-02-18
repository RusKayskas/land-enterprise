import dataLayer from './dataLayer';
import userCookie from './userCookie';
import { ecommerceData } from '@/page/enterprise/data';
export default class TariffsDataLayer {
  constructor() {
    this.data = {
      ecommerce: {
        currencyCode: 'RUB',
        customerCookie: userCookie(),
        customerId: '',
        add: {
          products: [
            {
              id: ecommerceData.id,
              name: ecommerceData.name,
              price: ecommerceData.price,
              category: 'proxy',
            },
          ],
        },
      },
      event: 'ecommerceAdd',
    };
  }

  push() {
    dataLayer({ ecommerce: null });
    dataLayer(this.data);
  }
}
