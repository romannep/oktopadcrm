import { Elements, getElement } from 'katejs/lib/client';
import { structures } from '../structure';

const Class = structures.Class;

export default class ClassModal {
  constructor(args) {
    Object.assign(this, args);

    this.elements = [
      {
        id: 'classModal',
        type: Elements.MODAL,
        fullWidth: true,
        maxWidth: 'xl',
        open: false,
        onClose: null,
        elements: [
          {
            type: Elements.GROUP,
            div: true,
            style: { display: 'flex' },
            elements: [
              {
                type: Elements.LABEL,
                title: 'Class',
                tag: 'h4',
                style: { width: 200 },
              },
              {
                type: Elements.BUTTON,
                title: 'Save',
                onClick: () => this.save(),
              },
              {
                type: Elements.BUTTON,
                title: 'Close',
              },
              {
                type: Elements.BUTTON,
                title: 'Delete',
                style: { marginLeft: 50 },
              },
            ],
          },
          {
            type: Elements.GRID,
            elements: [
              {
                ...getElement(Class.fields.find(f => f.name === 'tutor'), this),
              },
              {
                ...getElement(Class.fields.find(f => f.name === 'course'), this),
              },
              {
                ...getElement(Class.fields.find(f => f.name === 'start')),
                title: 'Start',
              },
              {
                ...getElement(Class.fields.find(f => f.name === 'durationMin')),
                title: 'Duration, min',
              },
            ],
          },
          {
            id: 'spacer',
            type: Elements.LABEL,
            tag: 'p',
            title: ' ',
            style: { height: 300 },
          },
        ],
      },
    ];
  }
  open(params) {
    this.content.classModal.open = true;

    // existing
    if (params.uuid) {

    } else {
      // new
      const { start, end } = params;
      this.content.start.value = start;
      this.content.durationMin.value = Math.ceil( (end.getTime() - start.getTime()) / (1000 * 60) );
    }

  }

  save() {
    const { tutor, course, start, durationMin } = this.form.getValues();
    this.app.Class.put({ body: { tutor, course, start, durationMin } });
  }
}
