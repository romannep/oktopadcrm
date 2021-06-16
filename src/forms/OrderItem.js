import { Elements } from 'katejs/lib/client';

import ClientSelection from './ClientSelection';

export class ProductsTable {
  constructor(args) {
    this.elements = args.elements;
    this.content = args.content;
    this.app = args.app;

    this.elements.get('products').columns[1].onChange = this.productChange;
    this.elements.get('products').columns[1].openOnFocus = true;
    this.elements.get('products').columns[2].onChange = this.rowChange;
    this.elements.get('products').columns[3].onChange = this.rowChange;
  }
  rowChange = (row) => {
    // eslint-disable-next-line no-param-reassign
    row.sum.value = (row.amount.value * row.price.value).toFixed(2);
    this.sumChange();
  }
  productChange = async (row) => {
    const { price, amount, product } = row;
    if (!product.value) return;
    const priceTypeContent = this.content.priceType;
    const priceType = priceTypeContent && priceTypeContent.value;
    const where = {
      '$products.productUuid$': product.value.uuid,
    };
    // use selected price type, otherwise use pricelist without price type
    where.priceTypeUuid = (priceType && priceType.uuid) || null;
    const { response: prices } = await this.app.PriceList.query({
      where,
      order: [['date', 'DESC']],
      limit: 1,
    });
    if (prices.length && prices[0].products.length) {
      price.value = prices[0].products[0].price;
    } else {
      price.value = product.value.price;
    }
    if (!row.amount.value) {
      amount.value = 1;
    }
    this.rowChange(row);
  }
  sumChange() {
    const total = this.content.products.value
      .reduce((acc, val) => (val.sum ? acc + (+val.sum) : acc), 0);
    if (this.onSumChange) {
      this.onSumChange(total.toFixed(2));
    } else {
      this.content.total.value = total.toFixed(2);
    }
  }
}

const OrderItemMixin = Form => class OrderItem extends Form {
  static doc = true;
  constructor(params) {
    super(params);
    this.clientSelection = new ClientSelection({
      form: this,
      replaceSelect: true,
      changePhoneAddress: true,
      openOnFocus: true,
    });
    this.productsTable = new ProductsTable(this);
    this.elements.set('phone', {
      type: Elements.GRID,
      elements: [
        { ...this.elements.get('phone'), cols: 4 },
        { ...this.elements.get('address'), cols: 8 },
      ],
    });
    this.elements.splice(this.elements.findIndex(item => item.id === 'address'), 1);

    this.elements.set('cashbox', {
      type: Elements.GRID,
      elements: [
        {
          type: Elements.LABEL,
          title: 'Apply payment',
          style: { marginTop: 28, textAlign: 'right' },
          cols: 4,
        },
        {
          ...this.elements.get('payment'),
          cols: 4,
        },
        {
          ...this.elements.get('cashbox'),
          openOnFocus: true,
          cols: 4,
        },
      ],
    });
    this.elements.splice(this.elements.findIndex(item => item.id === 'payment'), 1);

    this.actions.push({
      type: Elements.BUTTON,
      title: 'Print',
      onClick: this.print,
    });
  }
  afterInit() {
    if (super.afterInit) {
      super.afterInit();
    }
    if (!this.uuid && this.app.vars.currentInvoiceData) {
      const data = this.app.vars.currentInvoiceData;
      this.content.client.value = data.client;
      this.content.comment.value = data.comment;
      this.content.products.value = data.products;
      this.app.vars.currentInvoiceData = undefined;
      this.productsTable.sumChange();
    }
  }
  print = async () => {
    const { response: doc } = await this.app.Order.get({ uuid: this.uuid });
    const data = {
      ...doc,
      companyName: this.app.settings.companyName,
    };
    this.app.print({ template: 'Order', data });
  }
};

export default OrderItemMixin;

// base print template
// < !doctype html >
//   <html lang="en">
//     <head>
//       <!-- Required meta tags -->
//     <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

//           <!-- Bootstrap CSS -->
//     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

//             <title>{{ Order }}</title>
//             <style>
//               html, body {
//                 width: 210mm;
//               height: 297mm;
//             }
// </style>
//   </head>
//           <body>
//             <div class="container">
//               <h3>{{ title }}</h3>
//               <p>Компания: {{ companyName }}</p>
//               <p>Клиент: {{ client.title }}</p>
//               <table class="table">
//                 <tr>
//                   <td>Товар</td>
//                   <td>Кол-во</td>
//                   <td>Цена</td>
//                   <td>Сумма</td>
//                 </tr>
//                 {{#each products}}
//                 <tr>
//                   <td>{{ product.title }}</td>
//                   <td>{{ amount }}</td>
//                   <td>{{ price }}</td>
//                   <td>{{ sum }}</td>
//                 </tr>
//                 {{/ each}}
//                 <tr>
//                   <td colspan="3">Итого</td>
//                   <td>{{ total }}</td>
//                 </tr>
//               </table>

//             </div>
//           </body>
// </html>
