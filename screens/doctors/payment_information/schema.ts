import * as yup from 'yup';

const schema = yup.object({
  bankName: yup.string().required('bank name is required'),
  bankAddress: yup.string().required('bank address is required'),
  branch: yup.string().required('bank branch is required'),
  swiftCode: yup.string().required('swift code is required'),
  accountHolderName: yup.string().required("account holder's name is required"),
  accountNumber: yup.string().required('account number is required'),
  mobileAccount: yup.string().required('mobile account is required'),
});

export default schema;
