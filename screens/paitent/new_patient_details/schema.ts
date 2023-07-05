import * as yup from 'yup';

const schema = yup.object({
  gender: yup.string().required(),
  dob: yup.string().required('date of birth is required'),
  height_ft: yup.number().required('height in ft is required').min(1),
  height_inches: yup
    .number()
    .required('height in inches is required')
    .min(1)
    .max(11),
  weight: yup.number().required(),
  blood_group: yup.string().required('blood group is required field'),
  diseases_and_conditions: yup.array().required(),
  isUnderDoctorCare: yup.boolean().required('required'),
});

export default schema;
