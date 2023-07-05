import axios from 'axios';

export const getAllCategories = async () => {
  console.log(process.env.API_URL + 'utils/get-medical-categories');
  let res = await axios
    .get(process.env.API_URL + 'utils/get-medical-categories')
    .then((res: any) => {
      console.log('res=', res.data);
      return res.data.medical_categories;
    })
    .catch((err: any) => {
      console.log('err=', err.response.data);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });

  return res;
};
