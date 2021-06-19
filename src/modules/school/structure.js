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
      skipForList: true,
    },
    {
      name: 'individual',
      type: Fields.BOOLEAN,
      skipForList: true,
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
      attributes: ['uuid', 'title', 'color', 'individual'],
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
  Perpetual: 'perpetual',
  Months: 'months',
  Days: 'days',
};

export const ValidityTypeOptions = Object.keys(ValidityType).map((key) => ({
  title: key,
  value: ValidityType[key],
}));

export const productFields = [
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

const Subscription = {
  fields: [
    ...productFields,
    {
      name: 'client',
      type: Fields.REFERENCE,
      entity: 'Client',
    },
    {
      name: 'order',
      type: Fields.REFERENCE,
      entity: 'Order',
    },
    {
      name: 'expiredDate',
      type: Fields.DATE,
    },
  ],
  tables: [
    ...productTables,
  ],
};

export const orderFields = [
  {
    name: 'createSubscription',
    type: Fields.BOOLEAN,
  },
  {
    name: 'subscriptionStarts',
    type: Fields.DATE,
  },
];

export const structures = {
  Course,
  Class,
  Attendance,
  Subscription,
};

export const clientField = {
  name: 'client',
  type: Fields.REFERENCE,
  entity: 'Client',
};
