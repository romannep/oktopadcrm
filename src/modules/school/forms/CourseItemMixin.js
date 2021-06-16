import { Elements } from 'katejs/lib/client';


const COLOR_VALUE = 200;

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

const getColor = () => {
  const r = Math.ceil(Math.random() * COLOR_VALUE);
  const g = Math.ceil(Math.random() * COLOR_VALUE);
  const b = Math.ceil(Math.random() * COLOR_VALUE);
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

export default Form => class CourseItemMixin extends Form {
  constructor(args) {
    super(args);
    this.elements.set('color', {
      type: Elements.GRID,
      elements: [
        {
          type: Elements.LABEL,
          title: 'Color',
          cols: 1,
          id: 'color',
          value: '',
          style: { marginTop: 10 },
        },
        {
          id: 'colorBar',
          type: Elements.LABEL,
          style: { display: 'inline-block', width: 30, height: 30, marginTop: 10 },
          cols: 1,
        },
        {
          type: Elements.BUTTON,
          title: 'Change',
          onClick: () => this.changeColor(),
        },
      ],
    });
  }

  afterInit() {
    super.afterInit();
    if (!this.uuid) {
      this.changeColor();
    }
  }

  async load() {
    await super.load();
    this.drawColor();
  }

  changeColor() {
    this.content.color.value = getColor();
    this.drawColor();
  }

  drawColor() {
    this.content.colorBar.style = {
      ...this.content.colorBar.style,
      backgroundColor: this.content.color.value,
    };
  }
}
