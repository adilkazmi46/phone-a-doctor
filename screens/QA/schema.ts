import * as yup from 'yup';

export const doctor_schema = yup.object({
  title: yup.string().required(),
  email: yup.string().email().required(),
});

export const patient_schema = yup.object({
  phone_number: yup.string().required('phone number is required'),
  gender: yup.string().required(),
  dob: yup.string().required('date of birth is required'),
  height_ft: yup.string().required('height in ft is required'),
  height_inches: yup.string().required('height in inches is required'),
  weight: yup.string().required(),
  blood_group: yup.string().required('blood group is required field'),
  language: yup.string().required(),
  diseases_or_condition: yup.string().required(),
  email: yup.string().email(),
  isUnderDoctorCare: yup.boolean().required('required'),
  timezone_utc: yup.string().required('required'),
  timezone_code: yup.string().required('required'),
});
