import * as yup from 'yup';

export const phone_number_schema = yup.object({
  phone_number: yup.string().required('phone number required'),
});

export const code_schema = yup.object({
  code: yup.string().required('phone number required'),
});

export const new_password_schema = yup.object({
  new_password: yup.string().required('new password required'),
  confirm_new_password: yup
    .string()
    .required('confrim new password required')
    .oneOf([yup.ref('new_password'), null], 'passwords must match'),
});

export const verify_code_schema = yup.object({
  code_1: yup.string().required('code 1 required'),
  code_2: yup.string().required('code 2 required'),
  code_3: yup.string().required('code 3 required'),
  code_4: yup.string().required('code 4 required'),
  code_5: yup.string().required('code 5 required'),
  code_6: yup.string().required('code 6 required'),
});
