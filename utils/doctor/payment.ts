import {API_URL} from './../stripe';
import axios from 'axios';

export const getPaymentInformation = async () => {};

export const savePaymentInformation = async ({
  BankName,
  BankAddress,
  Branch,
  SwiftCode,
  AccountHolderName,
  AccountNumber,
  MobileAccount,
}: {
  BankName: String;
  BankAddress: String;
  Branch: String;
  SwiftCode: String;
  AccountHolderName: String;
  AccountNumber: String;
  MobileAccount: String;
}) => {
  let res = await axios
    .post(process.env.API_URL + 'doctor/update-bank-details', {
      bank_name: BankName,
      bank_address: BankAddress,
      swift_code: SwiftCode,
      mobile_account: MobileAccount,
      account_holder_name: AccountHolderName,
      account_number: AccountNumber,
      branch: Branch,
    })
    .then((res: any) => {
      console.log('res.data=', res.data);
      return {user: res.data.user};
    })
    .catch((err: any) => {
      console.log('error_response=', err.response.data);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });

  return res;
};
