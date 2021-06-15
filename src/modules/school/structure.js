import Fields from 'katejs/lib/fields';

//
// Занятие - class
// Направление - course
// Абонемент - subscription
//

const Course = {
  fields: [
    {
      name: 'title',
      type: Fields.STRING,
    },
    {
      name: 'color',
      type: Fields.STRING,
    },
  ],
};

const Class = {
  fields: [
    {
      name: 'title',
      type: Fields.STRING,
    },
    {
      name: 'course',
      type: Fields.REFERENCE,
      entity: 'Course',
      attributes: ['uuid', 'title', 'color'],
    },
    {
      name: 'tutor',
      type: Fields.REFERENCE,
      entity: 'User',
    },
    {
      name: 'start',
      type: Fields.DATE,
    },
    {
      name: 'durationMin',
      type: Fields.INTEGER,
    },
    {
      name: 'individual',
      type: Fields.BOOLEAN,
    },
  ],
};

const Attendance = {
  fields: [
    {
      name: 'client',
      type: Fields.REFERENCE,
      entity: 'Client',
    },
    {
      name: 'class',
      type: Fields.REFERENCE,
      entity: 'Class',
    },
    {
      name: 'attend',
      type: Fields.BOOLEAN,
    },
  ],
};

export const ValidityType = {
  Perpetual: 'parpetual',
  Months: 'months',
  Days: 'days',
};

export const productFields = [
  {
    name: 'isSubscription',
    type: Fields.BOOLEAN,
  },
  {
    name: 'individual',
    type: Fields.BOOLEAN,
  },
  {
    name: 'attendances',
    type: Fields.INTEGER,
  },
  {
    name: 'validityType',
    type: Fields.STRING,
  },
  {
    name: 'validityAmount',
    type: Fields.INTEGER,
  },
];

export const productTables = [
  {
    name: 'courses',
    fields: [
      {
        name: 'course',
        type: Fields.REFERENCE,
        entity: 'Course',
      },
    ],
  },
];

export const structures = {
  Course,
  Class,
  Attendance,
};

export const clientField = {
  name: 'client',
  type: Fields.REFERENCE,
  entity: 'Client',
};
