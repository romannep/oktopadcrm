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
              // {
              //   type: Elements.BUTTON,
              //   title: 'Save',
              //   onClick: () => this.save(),
              // },
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
                onChange: () => this.change(),
                cols: 3,
              },
              {
                ...getElement(Class.fields.find(f => f.name === 'course'), this),
                onChange: () => this.change(),
                cols: 3,
              },
              {
                ...getElement(Class.fields.find(f => f.name === 'start')),
                title: 'Start',
                onChange: () => this.change(),
                cols: 2,
              },
              {
                ...getElement(Class.fields.find(f => f.name === 'durationMin')),
                title: 'Duration min',
                onChange: () => this.change(),
                cols: 2,
              },
              {
                title: 'Individual class',
                id: 'individual',
                type: Elements.CHECKBOX,
                disabled: true,
                cols: 2,
              },
            ],
          },
          {
            id: 'addAttendance',
            type: Elements.BUTTON,
            title: 'Добавить посещение',
            onClick: () => this.addAttendance(),
            style: { marginBottom: 20 },
          },
          {
            type: Elements.GRID,
            id: 'rowsTitle',
            elements: [
              {
                type: Elements.LABEL,
                title: 'Клиент',
                tag: 'h4',
                cols: 4,
              },
              {
                type: Elements.LABEL,
                title: 'Посетил',
                tag: 'h4',
                cols: 1,
              },
            ],
          },
          {
            type: Elements.GROUP,
            id: 'rows',
            elements: [],
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

    this.aChangeTimeouts = {};
    this.attendanceUuids = {};
  }

  async open(params) {
    this.content.classModal.open = true;
    this.content.rows.elements = [];

    // existing
    if (params.uuid) {
      this.uuid = params.uuid;
      const { response: classData } = await this.app.Class.get({ uuid: params.uuid });
      this.form.setValues(classData);
      this.loadAttendances();
      this.availability();
    } else {
      // new
      this.uuid = undefined;
      const { start, end } = params;
      this.content.tutor.value = null;
      this.content.course.value = this.app.vars.currentCourse;
      this.content.start.value = start;
      this.content.durationMin.value = Math.ceil( (end.getTime() - start.getTime()) / (1000 * 60) );
      this.save();
    }
  }

  change() {
    this.content.individual.value = this.content.course?.value?.individual;
    this.availability();
    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
      this.changeTimeout = undefined;
    }
    this.changeTimeout = setTimeout(() => {
      this.save();
    }, 500);
  }

  async save() {
    const { tutor, course, start, durationMin, individual } = this.form.getValues();
    const { response: saved } = await this.app.Class.put({ uuid: this.uuid, body: { tutor, course, start, durationMin, individual } });
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

  addAttendance(data = {}) {
    const rowId = Math.ceil(Math.random() * 10000);
    const row = {
      id: `row${rowId}`,
      type: Elements.GRID,
      elements: [
        {
          id: `client${rowId}`,
          type: Elements.SELECT,
          getOptions: (q) => this.clientQuery(q),
          title: '',
          cols: 4,
          onChange: () => this.changeAttendanceClient(rowId),
          value: data.client,
        },
        {
          id: `attend${rowId}`,
          type: Elements.CHECKBOX,
          cols: 1,
          onChange: () => this.changeAttendanceAttend(rowId),
          style: { marginTop: 10 },
          value: data.attend,
        },
        {
          type: Elements.BUTTON,
          title: 'X',
          onClick: () => this.delAttendance(rowId),
          style: { marginTop: 20 },
        },
      ],
    };
    if (data) {
      this.attendanceUuids[rowId] = data.uuid;
    }
    this.content.rows.elements.push(row);
    this.content.rows.elements.sort((a,b) => a.elements[0].value?.title > b.elements[0].value?.title ? 1 : a.elements[0].value?.title < b.elements[0].value?.title ? -1 : 0);
    this.content.rows.elements = [...this.content.rows.elements];
    this.attendanceAvailability(rowId);
    this.availability();
  }

  async clientQuery(query) {
    const { response } = await this.app.Client.query({
      where: {
        $or: [
          { title: { $like: `%${query || ''}%` } },
          { phone: { $like: `%${query || ''}%` } },
          { address: { $like: `%${query || ''}%` } },
        ],
      },
    });
    return (response || []).map(item => ({ ...item, title: `${item.title} (${item.phone || ''}${(item.phone && item.address) ? ',' : ''}${item.address || ''})` }));
  }

  attendanceAvailability(rowId) {
    // без клиента нельзя ставить посещения
    // с посещением нельзя менять клиента
    const client = this.content[`client${rowId}`];
    const attend = this.content[`attend${rowId}`];
    attend.disabled = !client.value;
    client.disabled = attend.value;
  }

  async changeAttendanceClient(rowId) {
    const body = {
      client: this.content[`client${rowId}`].value,
      class: { uuid: this.uuid },
    };
    const uuid = this.attendanceUuids[rowId];
    const { response } = await this.app.Attendance.put({ uuid, body: body });
    this.attendanceUuids[rowId] = response.uuid;
    this.attendanceAvailability(rowId);
  }

  async changeAttendanceAttend(rowId) {
    const attend = this.content[`attend${rowId}`];
    // отправляем на бэк: хотим отметить (списать) на такое то занятие такого то клиента
    // ищем там абонемент и пишем его в посещение или возвращаем ответ что абонементов нет
    await this.app.School.action({ action: 'attend' });
    // debug
    attend.value = false;


    this.attendanceAvailability(rowId);
  }

  async saveAttendance(rowId) {
    if (this.aChangeTimeouts[rowId]) {
      clearTimeout(this.aChangeTimeouts[rowId]);
      this.aChangeTimeouts[rowId] = undefined;
    }
    const body = {
      client: this.content[`client${rowId}`].value,
      attend: this.content[`attend${rowId}`].value,
      class: { uuid: this.uuid },
    };
    const uuid = this.attendanceUuids[rowId];
    setTimeout(async () => {
      const { response } = await this.app.Attendance.put({ uuid, body: body });
      this.attendanceUuids[rowId] = response.uuid;
    }, 500);
  }

  async loadAttendances() {
    const { response } = await this.app.Attendance.query({
      where: {
        classUuid: this.uuid,
      },
    });
    response.forEach(att => this.addAttendance(att));
  }

  async delAttendance(rowId) {
    await this.app.Attendance.delete({ uuid: this.attendanceUuids[rowId] });
    const rows = this.content.rows.elements;
    rows.splice(rows.findIndex(i => i.id === `row${rowId}`), 1);
    this.content.rows.elements = [...rows];
    this.availability();
  }

  availability() {
    this.content.addAttendance.disabled = this.content.individual.value && this.content.rows.elements.length;
  }
}
