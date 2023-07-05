import {API_URL} from './stripe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const signUp = async (
  phone: string,
  password: string,
  fullName: string,
  userType: string,
) => {
  console.log('process env api askdjaskljd=', process.env.API_URL);

  let res = await axios
    .post(process.env.API_URL + 'user/register-user', {
      userType: userType,
      phone_number: phone,
      full_name: fullName,
      password: password,
    })
    .then((res: any) => {
      return {user: res.data.user, token: res.data.token, success: true};
    })
    .catch((err: any) => {
      console.log('error singup =', err);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });

  return res;
};

export const login = async ({
  password,
  phone,
}: {
  password: string;
  phone: string;
}) => {
  console.log(process.env.API_URL + 'user/signin');
  let res = await axios
    .post(
      process.env.API_URL + 'user/signin',
      {
        phone_number: phone,
        password: password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
    .then(async (res: any) => {
      console.log('signin response=');
      console.log(res.data);
      await AsyncStorage.setItem('jwt_token', res.data.token);
      return {success: true, data: res.data};
    })
    .catch((err: any) => {
      console.log('error=', err);
      console.log('error_code=', err.response.status);
      console.log('err_message=', err.response.data.errors);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });

  return res;
};

export const getUserAttributes = async () => {
  let token = await AsyncStorage.getItem('jwt_token');

  if (token === null) {
    return {isError: true, message: 'no token found', err_code: 401};
  } else {
    console.log('url=', process.env.API_URL + 'user/get-user-attributes');
    let res = await axios
      .get(process.env.API_URL + 'user/get-user-attributes')
      .then((res: any) => {
        console.log('res 86=', res.data);
        let user = res.data.user;
        return {success: true, user: user};
      })
      .catch((err: any) => {
        console.log('err 91=', err.response.status);
        return {
          error: true,
          message: err.response.data.message,
          err_code: err.response.status,
        };
      });

    return res;
  }
};

export const verifyOTP = async (val: string) => {
  let res = await axios
    .post(process.env.API_URL + 'otp/verify-otp', {
      otp: val,
    })
    .then((res: any) => {
      return {user: res.data.user};
    })
    .catch((err: any) => {
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  return res;
};

export const resendOTP = async () => {
  let res = await axios
    .post(process.env.API_URL + 'otp/resend-otp')
    .then((res: any) => {
      return {resend: true};
    })
    .catch((err: any) => {
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  return res;
};

export const sendForgotPasswordOTP = async (phone_number: string) => {
  console.log(process.env.API_URL + 'user/send-forgot-password-code');
  let res = await axios
    .post(process.env.API_URL + 'user/send-forgot-password-code', {
      phone_number: phone_number,
    })
    .then((res: any) => {
      console.log('res=', res.data);
      return {success: res.data.success};
    })
    .catch((err: any) => {
      console.log('Err=', err.response.message);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  console.log('res util=', res);
  return res;
};

export const verify_forgot_password_otp = async ({
  phone_number,
  otp_code,
}: {
  phone_number: string;
  otp_code: string;
}) => {
  let res = await axios
    .post(process.env.API_URL + 'user/verify-forgot-password-otp', {
      phone_number: phone_number,
      otp_code: otp_code,
    })
    .then((res: any) => {
      return {success: res.data.success};
    })
    .catch((err: any) => {
      console.log('response data=', err.response.data);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  return res;
};

export const save_new_password = async ({
  otp_code,
  phone_number,
  new_password,
  confirm_new_password,
}: {
  otp_code: string;
  phone_number: string;
  new_password: string;
  confirm_new_password: string;
}) => {
  console.log('195', process.env.API_URL + 'user/save-new-password');
  let res = await axios
    .post(process.env.API_URL + 'user/save-new-password', {
      otp_code,
      phone_number,
      new_password,
      confirm_new_password,
    })
    .then((res: any) => {
      console.log('res 204=', res);
      return {success: true};
    })
    .catch((err: any) => {
      console.log('error 208=', err);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  console.log('res214=', res);
  return res;
};
