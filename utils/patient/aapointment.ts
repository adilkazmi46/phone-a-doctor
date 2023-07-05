import axios from 'axios';

export const get_all_active_appointments = async () => {
  let res = await axios
    .get(process.env.API_URL + 'appointment/get-all-active-appointments')
    .then((res: any) => {
      return {appointments: res.data.appointments};
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

export const cancel_appointment = async (appointment_id: string) => {
  let res = await axios
    .post(process.env.API_URL + 'appointment/cancel-appointment', {
      appointment_id: appointment_id,
    })
    .then((res: any) => {
      console.log('res 25 === ', res.data);
      return {appointment: res.data.appointment};
    })
    .catch((err: any) => {
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });
  console.log('line 35=', res);
  return res;
};

export const getUPComingAppointment = async () => {
  let res = await axios
    .get(process.env.API_URL + 'appointment/get-upcoming-appointment')
    .then((res: any) => {
      return {appointment: res.data.appointments};
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
