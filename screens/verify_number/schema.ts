import * as yup from 'yup';

const schema = yup.object({
  code_1: yup.string().required('code 1 required'),
  code_2: yup.string().required('code 2 required'),
  code_3: yup.string().required('code 3 required'),
  code_4: yup.string().required('code 4 required'),
  code_5: yup.string().required('code 5 required'),
  code_6: yup.string().required('code 6 required'),
});

export default schema;
