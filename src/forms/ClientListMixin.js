import { Elements } from 'katejs/lib/client';


export default ListForm => class ClientList extends ListForm {
  constructor(args) {
    super(args);
    this.elements.unshift({
      type: Elements.GRID,
      elements: [
        {
          id: 'client',
          title: 'Search (name, phone, address)',
          type: Elements.INPUT,
          onChange: this.clientChange,
          cols: 4,
        },
      ],
    });
  }
  clientChange = () => {
    if (this.changeTimeout) clearTimeout(this.changeTimeout);
    this.changeTimeout = setTimeout(this.search, 400);
  }
  search = () => {
    const query = this.content.client.value;
    this.filters = {
      $or: [
        { title: { $like: `%${query}%` } },
        { phone: { $like: `%${query}%` } },
        { address: { $like: `%${query}%` } },
      ],
    };
    this.load();
  }
};