import {API_URL} from './../stripe';
import axios from 'axios';

export const getTimeSlotList = async () => {
  let res = await axios
    .get(process.env.API_URL + 'utils/get-time-slots')
    .then((res: any) => {
      return res.data.time_slots;
    })
    .catch((err: any) => {
      console.log('error_status=', err.response.status);
      console.log('error_message=', err.response.message);
    });

  return res;
};

export const setAvailabilityHours = async ({
  available_days,
  from_time,
  to_time,
}: {
  available_days: Array<string>;
  from_time: string;
  to_time: string;
}) => {
  let res = await axios
    .post(process.env.API_URL + 'doctor/update-availablity-slots', {
      available_days: available_days,
      from_time: from_time,
      to_time: to_time,
    })
    .then((res: any) => {
      console.log('response availability data=', res.data);
      return {user: res.data.user};
    })
    .catch((err: any) => {
      console.log('error_s', err.response.data);
      return {
        error: true,
        message: err.response.data.message,
        err_code: err.response.status,
      };
    });

  return res;
};
