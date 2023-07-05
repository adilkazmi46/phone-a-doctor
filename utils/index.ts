import axios from 'axios';
export const getMedicalSpecialities = async () => {
  console.log('utils method');
  console.log(process.env.API_URL + 'utils/get-medical-specialities');
  let res = await axios
    .get(process.env.API_URL + 'utils/get-medical-specialities')
    .then(async (res: any) => {
      let tmp = res.data.medical_specialities;
      let arr: any = [];
      await tmp.map((item: any, index: number) => {
        arr.push({label: item.speciality, value: item.speciality});
      });
      console.log('arr=', arr);
      return arr;
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
export const changePassword = async ({
  old_password,
  new_password,
  confirm_new_password,
}: {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}) => {
  let res = await axios
    .post(process.env.API_URL + 'user/change-password', {
      old_password: old_password,
      new_password: new_password,
      confirm_new_password: confirm_new_password,
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      console.log('error res=', err);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  return res;
};

export const formatDate = (date: string) => {
  var d = new Date(date);
  var hh = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var dd = 'AM';
  var h = hh;
  if (h >= 12) {
    h = hh - 12;
    dd = 'PM';
  }
  if (h == 0) {
    h = 12;
  }
  //@ts-ignore
  m = m < 10 ? '0' + m : m;
  //@ts-ignore
  s = s < 10 ? '0' + s : s;

  /* if you want 2 digit hours: */
  //@ts-ignore
  h = h < 10 ? '0' + h : h;

  var pattern = new RegExp('0?' + hh + ':' + m + ':' + s);
  return date.replace(pattern, h + ':' + m + ':' + s + ' ' + dd);
};

export const getAllComplains = async () => {
  let res = await axios
    .get(process.env.API_URL + 'complain/get-all-complains')
    .then((res: any) => {
      console.log('res data_utils complains=', res.data);
      return {complains: res.data.complains};
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.messafe,
      };
    });
  return res;
};

export const getAllDygnosis = async () => {
  let res = await axios
    .get(process.env.API_URL + 'dygnosis/get-all-dygnoses')
    .then((res: any) => {
      console.log('res data_utils complains=', res.data);
      return {dygnoses: res.data.dygnoses};
    })
    .catch((err: any) => {
      console.log('err dygnmosis=', err);
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.messafe,
      };
    });
  return res;
};

export const getAllMedicines = async () => {
  let res = await axios
    .get(process.env.API_URL + 'medicine/get-all-medicines')
    .then((res: any) => {
      console.log('res data_utils complains=', res.data);
      return {medicines: res.data.medicines};
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.messafe,
      };
    });
  return res;
};

export const get_blood_groups = async () => {
  let res = await axios
    .get('utils/get-blood-group')
    .then((res: any) => {
      return {blood_groups: res.data.blood_groups};
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.messafe,
      };
    });
};

export const getMedicalCategories = async () => {
  console.log('utils method');
  console.log(process.env.API_URL + 'utils/get-medical-categories');
  let res = await axios
    .get(process.env.API_URL + 'utils/get-medical-categories')
    .then(async (res: any) => {
      let tmp = res.data.medical_categories;
      let arr: any = [];
      await tmp.map((item: any, index: number) => {
        console.log('item 157=', item);
        arr.push({
          label: item.category,
          value: item.category,
        });
      });
      console.log('arr=', arr);
      return arr;
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

export const fetchPaymentSheetParams = async () => {
  let res = await axios
    .get(process.env.API_URL + 'user/payment-sheet')
    .then((res: any) => {
      return {
        setupIntent: res.data.setupIntent,
        ephemeralKey: res.data.ephemeralKey,
        customer: res.data.customer,
      };
    })
    .catch((err: any) => {
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  console.log('utils 193=', res);
  return res;
};

export const paymentSheetFilled = async ({
  label,
  image,
  setupIntent,
  ephemeralKey,
  customer,
}: {
  label: string;
  image: string;
  setupIntent: string;
  ephemeralKey: string;
  customer: string;
}) => {
  console.log('line 210=====>>>>>>>>>>>>');
  console.log({label: label, image, ephemeralKey, customer, setupIntent});
  let res = await axios
    .post(process.env.API_URL + 'user/payment-sheet-filled', {
      label: label,
      image,
      ephemeralKey,
      customer,
      setupIntent,
    })
    .then((res: any) => {
      return {
        success: res.data.success,
        user: res.data.user,
      };
    })
    .catch((err: any) => {
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  console.log('utils 193=', res);
  return res;
};

export const getStripeURL = async ({accountID}: {accountID: string}) => {
  console.log(
    process.env.API_URL + `user/stripe-account-url?accountID=${accountID}`,
  );
  let res: any = await axios
    .get(process.env.API_URL + `user/stripe-account-url?accountID=${accountID}`)
    .then(res => {
      console.log('res 242=', res.data);
      return {
        links: res.data.links,
        user: res.data.user,
        paymentIntent: res.data.paymentIntent,
      };
    })
    .catch((err: any) => {
      console.log('err 248 =', err);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  console.log('res 251=', res);
  return res;
};
