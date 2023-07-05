import axios from 'axios';

export const getPatientAttributes = async () => {
  let res: any = await axios
    .get(process.env.API_URL + 'patient/get-patient-attributes')
    .then((res: any) => {
      return res.data.patient;
    })
    .catch((err: any) => {
      console.log('error=', err.response.data);
      return {error: true, message: err.response.data};
    });
  return res;
};

export const addRelativePatient = async ({
  gender,
  height_ft,
  height_inches,
  weight,
  is_under_doctor_care,
  diseases_and_conditions,
  dob,
  bloodGroup,
  full_name,
}: {
  gender: string;
  height_ft: string;
  height_inches: string;
  weight: string;
  is_under_doctor_care: boolean;
  diseases_and_conditions: string;
  dob: string;
  bloodGroup: string;
  full_name: string;
}) => {
  let res: any = await axios
    .post(process.env.API_URL + 'patient/add-relative-patient', {
      gender,
      height_ft,
      height_inches,
      weight,
      is_under_doctor_care,
      diseases_and_conditions,
      dob,
      bloodGroup,
      full_name,
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
