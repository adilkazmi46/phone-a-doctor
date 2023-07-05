import * as yup from 'yup';
const schema = yup.object({
  about: yup.string().required('about is required').min(250),
  degree: yup.string().required('degree is required'),
  institute: yup.string().required('institute is required'),
  chamber_or_hospital_address: yup
    .string()
    .required('chamber or hospital address required'),
  medical_certificate_no: yup
    .string()
    .required('medical certificate number required'),
  certificate_upload: yup.mixed().required('certificate file is required'),
  gov_id_no: yup.string().required('gov id number is required'),
  gov_id_front: yup.mixed().required('gov id front image is required'),
  gov_id_back: yup.mixed().required('gov id back image is required'),
  medical_field: yup.string().required('medical feild is required'),
  medical_category: yup.string().required('medical category is required'),
  medical_speciality: yup.string().required('medical speciality is required'),
  consultation_fee: yup.string().required('consultation fee is required'),
  follow_up_fee: yup.string().required('follow up fee is required'),
  experience: yup.string().required('experience is required'),
  doctor_24_7: yup.string().required('doctor_24_7 is required'),
});

export default schema;
