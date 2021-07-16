import { Elements } from 'katejs/lib/client';
import ClientDebt from './ClientDebt';
import ClientSales from './ClientSales';

const MAX_REPORT_HEIGHT = 500;

export const reportStyle = {
  maxHeight: MAX_REPORT_HEIGHT,
  overflowY: 'scroll',
};

export default ItemForm => class ClientItem extends ItemForm {
  constructor(args) {
    super(args);

    this.clientDebt = new ClientDebt({
      app: this.app,
      content: this.content,
      clientUuid: args.params.id,
      report: true,
    });

    this.clientSales = new ClientSales({
      app: this.app,
      content: this.content,
      clientUuid: args.params.id,
      report: true,
    });

    this.elements.set('phone', {
      type: Elements.GRID,
      elements: [
        {
          ...this.elements.get('phone'),
          cols: 6,
        },
        {
          ...this.elements.cut('address'),
          cols: 6,
        },
      ],
    });

    this.elements.push({
      id: 'reportGrid',
      type: Elements.GRID,
      elements: [
        {
          type: Elements.GROUP,
          cols: 6,
          elements: this.clientDebt.elements,
          div: true,
          style: reportStyle,
        },
        {
          type: Elements.GROUP,
          cols: 6,
          elements: this.clientSales.elements,
          div: true,
          style: reportStyle,
        },
      ],
    });
    this.actions.push({
      type: Elements.BUTTON,
      title: 'Invoice',
      onClick: () => this.invoice(),
    });
  }
  close() {
    window.history.back();
  }
  async invoice() {
    await this.save();
    this.app.vars.currentClient = {
      uuid: this.uuid,
      title: this.content.title.value,
    };
    this.app.open('InvoiceItem', {});
  }
};
