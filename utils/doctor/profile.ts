import {API_URL} from './../stripe';
import axios from 'axios';

export const save_doctor_information = async ({
  title,
  email,
  isSkiped,
}: {
  title: string;
  email: string;
  isSkiped: boolean;
}) => {
  try {
    let data: any;
    if (isSkiped === true) {
      data = {isSkipedEmail: true, title: title};
    } else if (isSkiped === false) {
      data = {isSkipedEmail: false, title: title, email: email};
    }
    let res = await axios
      .post(process.env.API_URL + 'doctor/save-information', data)
      .then((res: any) => {
        console.log('res doctor information utils=', res.data);

        return {success: true, user: res.data.user, doctor: res.data.doctor};
      })
      .catch((err: any) => {
        return {
          error: true,
          message: err.response.data.message,
          err_code: err.response.status,
        };
      });
    return res;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
      err_code: err.response.status,
    };
  }
};

export const updatePersonalProfile = async ({
  title,
  full_name,
  country,
  city,
  area,
  languageSpoken,
  gender,
  email,
  dob,
  address,
  timezone_code,
  timezone_utc,
  phone,
  division,
}: {
  title: string;
  full_name: string;
  country: string;
  city: string;
  area: string;
  languageSpoken: string;
  gender: string;
  email: string;
  dob: string;
  address: string;
  timezone_code: string;
  timezone_utc: string;
  phone: string;
  division: string;
}) => {
  let res: any = await axios
    .post(process.env.API_URL + 'doctor/update-personal-profile', {
      phone_number: phone,
      email: email,
      title: title,
      dob: dob,
      gender: gender,
      city: city,
      area: area,
      address: address,
      country: country,
      language: languageSpoken,
      division: division,
      timezone_code: timezone_code,
      timezone_utc: timezone_utc,
      full_name: full_name,
    })
    .then((res: any) => {
      console.log('axios res=', res.data.user);
      return {user: res.data.user};
    })
    .catch((err: any) => {
      console.log('axios error=', err);
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });

  return res;
};

export const updateUserAttributes = async ({}: {}) => {};

export const getProfile = async () => {
  return true;
};

export const professionalProfileUpdate = async ({
  degree,
  Institute,
  chamberOrHospitality,
  medicalCertificateNo,
  certificate,
  govIDNo,
  govIDFront,
  govIDBack,
  medicalField,
  medicalSpeciality,
  medicalCategory,
  consultationFee,
  followUpFee,
  experience,
  isDoctor247,
  about,
}: {
  degree: string;
  Institute: string;
  chamberOrHospitality: string;
  medicalCertificateNo: string;
  certificate: any;
  govIDNo: string;
  govIDFront: any;
  govIDBack: any;
  medicalField: string;
  medicalSpeciality: string;
  medicalCategory: string;
  consultationFee: string;
  followUpFee: string;
  experience: string;
  isDoctor247: boolean;
  about: string;
}) => {
  let formData = new FormData();

  formData.append('degree', degree);
  formData.append('institute', Institute);
  formData.append('certificate_number', medicalCertificateNo);
  formData.append('gov_id_number', govIDNo);
  formData.append('medical_field', medicalField);
  formData.append('medical_category', medicalCategory);
  formData.append('medical_speciality', medicalSpeciality);
  formData.append('exprerience', experience);
  formData.append('consultation_fee', consultationFee);
  formData.append('follow_up_fee', followUpFee);
  formData.append('chamber_or_hospital_address', chamberOrHospitality);
  formData.append('is_24_7', isDoctor247);
  formData.append('gov_id_front', govIDFront);
  formData.append('gov_id_back', govIDBack);
  formData.append('certificate_file', certificate);
  formData.append('about', about);
  formData.append('experience', experience);
  console.log('data=', formData);

  let res: any = await axios
    .post(
      process.env.API_URL + 'doctor/update-professional-profile',
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data boudary'},
      },
    )
    .then((res: any) => {
      console.log('res data proffessional profile=', res.data);
      return {success: true, user: res.data.user};
    })
    .catch((err: any) => {
      console.log(
        'error proffessional profile=',
        err.response,
        err.status,
        err.response.data.message,
      );
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  return res;
};
