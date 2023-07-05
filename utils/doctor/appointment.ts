import axios from 'axios';

export const requestAppointment = async ({
  from_slot_time,
  to_slot_time,
  appointment_date,
  appointment_day,
  doctor_id,
  is_relative,
  relative_patient,
}: {
  from_slot_time: string;
  to_slot_time: string;
  appointment_date: string;
  appointment_day: string;
  doctor_id: string;

  is_relative: boolean;
  relative_patient: any;
}) => {
  try {
    console.log({from_slot_time, to_slot_time});
    let res: any = await axios
      .post(process.env.API_URL + 'appointment/request-appointment', {
        from_slot_time: from_slot_time,
        to_slot_time: to_slot_time,
        appointment_date,
        appointment_day,
        doctor_id,
        is_relative: is_relative,
        relative_patient: relative_patient,
      })
      .then((res: any) => {
        console.log('res=', res.data);
        return {appointment: res.data.appointment};
      })
      .catch((err: any) => {
        console.log('error=', err);
        return {
          error: true,
          err_code: err.response.status,
          message: err.response.data.message,
        };
      });

    return res;
  } catch (err: any) {
    return {error: true, message: err.message};
  }
};

export const getAppointmentRequests = async () => {
  let res: any = await axios
    .get(process.env.API_URL + 'appointment/get-all-awaiting-appointments')
    .then((res: any) => {
      console.log('res 123 utils ==== ', res.data.appointments);
      return {
        appointments: res.data.appointments,
      };
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });
  return res;
};

export const getAppointments = async () => {
  let res: any = await axios
    .get(process.env.API_URL + 'appointment/get-all-active-appointments')
    .then((res: any) => {
      console.log('res 68 === ', res.data);
      return {
        appointments: res.data.appointments,
      };
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });
  return res;
};

export const acceptAppointmentRequest = async ({
  appointment_id,
  from_slot,
  to_slot,
  appointment_date,
}: {
  appointment_id: string;
  from_slot: string;
  to_slot: string;
  appointment_date: string;
}) => {
  // return true;
  let res = await axios
    .post(process.env.API_URL + 'appointment/accept-appointment', {
      appointment_id,
      from_slot_time: from_slot,
      to_slot_time: to_slot,
      appointment_date,
    })
    .then((res: any) => {
      console.log('axios res=', res.data);
      return {success: true, appointment: res.data.appointment};
    })
    .catch((err: any) => {
      console.log('axios res=', err);

      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });
  return res;
};

export const write_appointment_prescription = async ({
  appointment_id,
  patient_id,
  complains,
  dygnosis,
  advice,
  investigation,
  medicines,
  need_follow_up_consultation,
}: {
  appointment_id: string;
  patient_id: string;
  complains: Array<string>;
  dygnosis: Array<string>;
  advice: string;
  investigation: string;
  medicines: Array<any>;
  need_follow_up_consultation: boolean;
}) => {
  console.log('utils vqlues=', {
    appointment_id: appointment_id,
    patient_id: patient_id,
    medicines: medicines,
    advice: advice,
    investigation: investigation,
    complains: complains,
    dygnosis: dygnosis,
    need_follow_up_consultation: need_follow_up_consultation,
  });
  let res = await axios
    .post(process.env.API_URL + 'appointment/write-prescription', {
      appointment_id: appointment_id,
      patient_id: patient_id,
      medicines: medicines,
      advice: advice,
      investigation: investigation,
      complains: complains,
      dygnosis: dygnosis,
      need_follow_up_consultation: need_follow_up_consultation,
    })
    .then((res: any) => {
      return {appointment: res.data.appointment};
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });

  return res;
};

export const rejectAppointment = async (appointment_id: string) => {
  let res: any = await axios
    .post(process.env.API_URL + 'appointment/reject-appointment-request', {
      appointment_id,
    })
    .then((res: any) => {
      return {appointment: res.data.appointment};
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });
  return res;
};

export const getAllAppointments = async () => {
  let res = await axios
    .get(process.env.API_URL + 'appointment/get-all-appointments')
    .then((res: any) => {
      console.log('194 utils===', res.data);
      return {appointments: res.data.appointments};
    })
    .catch((err: any) => {
      return {
        error: true,
        err_code: err.response.status,
        message: err.response.data.message,
      };
    });
  return res;
};
