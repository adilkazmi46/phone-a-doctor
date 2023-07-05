import * as yup from 'yup';
const schema = yup.object({
  fullName: yup.string().required('full name required'),
  phone: yup.string().required('phone number is required'),
  country_code: yup.string().required('country code required'),
  password: yup.string().required(),
  confirm_password: yup
    .string()
    .required('confrim password required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default schema;
