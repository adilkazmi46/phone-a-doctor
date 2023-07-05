import * as yup from 'yup';
const schema = yup.object({
  phone: yup.string().required('phone number is required'),
  password: yup.string().required(),
});

export default schema;
