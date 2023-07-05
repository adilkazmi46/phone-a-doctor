import axios from 'axios';
import {Platform} from 'react-native';
import {API_URL} from './../stripe';
export const uploadProfilePic = async ({img}: {img: any}) => {
  let formData = new FormData();
  formData.append('profile_pic', img);
  const trimmedURI =
    Platform.OS === 'android' ? img.uri : img.uri.replace('file://', '');
  const fileName = trimmedURI.split('/').pop();
  const media = {
    name: fileName,
    height: img.height,
    width: img.width,
    type: 'image/*',
    uri: trimmedURI,
  };
  console.log('media=', media);

  formData.append('profile_pic', media);
  let res = await axios
    .post(process.env.API_URL + 'doctor/upload-profile-pic', formData, {
      // headers: { "Content-Type": "multipart/form-data boudary" }
    })
    .then((res: any) => {
      console.log('res.data=', res.data);
      return {user: res.data.user};
    })
    .catch((err: any) => {
      console.log(err);
      console.log('err=', err);
      return {
        error: true,
        message: err.response.data.message,
      };
    });
  return res;
};

export const getAllDoctorsLocal = async () => {
  let res = await axios
    .get(process.env.API_URL + 'doctor/get-all-doctors-local')
    .then((res: any) => {
      console.log('response users 43=', res.data);
      return {users: res.data.users};
    })
    .catch((err: any) => {
      console.log('errors 47 === ', err.response.data);
      // return err;
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  return res;
};

export const getAllDoctorsForeign = async () => {
  let res = await axios
    .get(process.env.API_URL + 'doctor/get-all-doctors-foreign')
    .then((res: any) => {
      console.log('response users 62=', res.data);

      return {users: res.data.users};
    })
    .catch((err: any) => {
      // return err;
      console.log('response users 68=', err);

      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,  
      };
    });
  return res;
};

export const getDoctorAttributes = async () => {
  let res: any = await axios
    .get(process.env.API_URL + 'doctor/get-doctor-attributes')
    .then((res: any) => {
      return res.data.doctor;
    })
    .catch((err: any) => {
      console.log('error=', err.response.data);
      return {
        error: true,
        message: err.response.data,
        err_code: err.response.status,
      };
    });
  return res;
};

export const searchDoctorByMedicalSpeciality = async (
  medical_speciality: string,
) => {
  let res = await axios
    .get(
      process.env.API_URL +
        'doctor/search-doctor-by-medical-speciality?medical_speciality=' +
        medical_speciality,
    )
    .then((res: any) => {
      return {doctors: res.data.doctors};
    })
    .catch((err: any) => {
      console.log('error=', err.response.data);
      return {
        error: true,
        message: err.response.data,
        err_code: err.response.status,
      };
    });
  return res;
};

export const searchDoctor = async (query_params: string) => {
  let res = await axios
    .get(process.env.API_URL + 'doctor/search-doctor?' + query_params)
    .then((res: any) => {
      console.log('doctors=', res.data.doctor);
      return {users: res.data.users};
    })
    .catch((err: any) => {
      console.log('error=', err.response.data);
      return {
        error: true,
        message: err.response.data,
        err_code: err.response.status,
      };
    });
  return res;
};
