import {API_URL} from './../stripe';
import axios from 'axios';

export const update_Patient_Profile = async ({
  phone,
  gender,
  dob,
  email,
  height_ft,
  height_inches,
  weight,
  bloodGroup,
  isUnderDoctorCare,
  deseases,
  language,
  isSkipedEmail,
  timezone_code,
  timezone_utc,
}: {
  phone: string;
  gender: string;
  dob: string;
  email: string;
  height_ft: string;
  height_inches: string;
  weight: string;
  bloodGroup: string;
  isUnderDoctorCare: boolean;
  deseases: Array<string>;
  language: string;
  isSkipedEmail: boolean;
  timezone_code: string;
  timezone_utc: string;
}) => {
  try {
    let data: any;
    if (isSkipedEmail === true) {
      data = {
        phone_number: phone,
        gender,
        dob,
        height_ft,
        height_inches,
        weight,
        bloodGroup,
        is_under_doctor_care: isUnderDoctorCare,
        diseases_or_conditions: deseases,
        language,
        timezone_code,
        timezone_utc,
        isSkipedEmail,
      };
    }
    if (isSkipedEmail === false) {
      data = {
        phone_number: phone,
        gender,
        dob,
        email,
        height_ft,
        height_inches,
        weight,
        bloodGroup,
        is_under_doctor_care: isUnderDoctorCare,
        diseases_or_conditions: deseases,
        language,
        timezone_code,
        timezone_utc,
        isSkipedEmail,
      };
    }
    let res = await axios
      .post(process.env.API_URL + 'patient/update-patient-information', data)
      .then((res: any) => {
        console.log('res util patient=', res);
        return {user: res.data.user};
      })
      .catch((err: any) => {
        console.log('error util patient=', err.response.data);

        return {
          error: true,
          err_code: err.response.status,
          err_msg: err.response.data.message,
        };
      });
    return res;
  } catch (err: any) {
    return {error: true, message: err.message};
  }
};

export const updateProfile = async ({
  address,
  bloodGroup,
  city,
  area,
  division,
  height_ft,
  height_inches,
  weight,
  languageSpoken,
  country,
  dob,
  gender,
  name,
}: {
  address: string;
  bloodGroup: string;
  city: string;
  area: string;
  division: string;
  height_ft: string;
  height_inches: string;
  weight: string;
  languageSpoken: string;
  country: string;
  dob: string;
  gender: string;
  name: string;
}) => {
  let res = await axios
    .post(process.env.API_URL + 'patient/update-patient-profile', {
      full_name: name,
      gender: gender,
      city: city,
      country: country,
      area: area,
      address: address,
      language: languageSpoken,
      division: division,
      weight: weight,
      height_ft: height_ft,
      height_inches: height_inches,
      dob: dob,
      bloodGroup: bloodGroup,
    })
    .then((res: any) => {
      console.log('patient profile res=', res.data);
      return {patient: res.data.patient, user: res.data.user};
    })
    .catch((err: any) => {
      console.log('patient profile err=', err.response.data);
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });

  return res;
};
