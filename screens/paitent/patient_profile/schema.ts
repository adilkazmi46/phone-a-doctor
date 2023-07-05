import * as yup from 'yup';

const schema = yup.object({
  blood_grp: yup
    .string()
    .matches(/^(A|B|AB|O)[+-]$/i, 'invalid blood group')
    .required(),
  name: yup.string().required(),
  dob: yup.string().required(),
  division: yup.string().required(),
  city: yup.string().required(),
  area: yup.string().required(),
  height_ft: yup.string().required(),
  height_inches: yup.string().required(),
  weight: yup.string().required(),
  language: yup.string().required(),
  timezone: yup.string().required(),
});

export default schema;
