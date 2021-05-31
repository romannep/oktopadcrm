import { Elements, getElement, ConfirmDialog } from 'katejs/lib/client';
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
                onClick: () => this.close(),
              },
              {
                type: Elements.BUTTON,
                title: 'Delete',
                style: { marginLeft: 50 },
                onClick: () => this.delete(),
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
      ConfirmDialog({ form: this.form, id: 'confirmDialog' }),
    ];
  }
  async open(params) {
    this.content.classModal.open = true;

    // existing
    if (params.uuid) {
      this.uuid = params.uuid;
      const { response: classData } = await this.app.Class.get({ uuid: params.uuid });
      this.form.setValues(classData);
    } else {
      // new
      this.uuid = undefined;
      const { start, end } = params;
      this.content.tutor.value = null;
      this.content.course.value = null;
      this.content.start.value = start;
      this.content.durationMin.value = Math.ceil( (end.getTime() - start.getTime()) / (1000 * 60) );
    }
  }

  async save() {
    const { tutor, course, start, durationMin } = this.form.getValues();
    const { response: saved } = await this.app.Class.put({ uuid: this.uuid, body: { tutor, course, start, durationMin } });
    this.uuid = saved.uuid;
  }

  close() {
    this.load();
    this.content.classModal.open = false;
  }

  async delete() {
    if (!await this.content.confirmDialog.confirm({ title: 'Are you sure?' })) return;
    await this.app.Class.delete({ uuid: this.uuid });
    this.content.classModal.open = false;
    this.load();
  }
}
