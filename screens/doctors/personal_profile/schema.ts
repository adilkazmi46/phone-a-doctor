import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().nullable(),
  fullName: yup.string().nullable(),
  email: yup.string().email().nullable(),
  phone: yup.string().nullable(),
  dob: yup.string().nullable(),
  gender: yup.string().nullable(),
  address: yup.string().nullable(),
  country: yup.string().nullable(),
  area: yup.string().nullable(),
  timezone: yup.string().nullable(),
  languageSpoken: yup.string().nullable(),
});

export default schema;
