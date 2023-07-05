import * as yup from 'yup';

const schema = yup.object({
  old_password: yup.string().required('old password required'),
  new_password: yup.string().required('new password required'),
  confirm_new_password: yup
    .string()
    .required('confirm password required')
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
});

export default schema;
