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
    {
      name: 'skipped',
      type: Fields.BOOLEAN,
    },
  ],
};

export const structures = {
  Course,
  Class,
  Attendance,
};
