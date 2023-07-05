import axios from 'axios';

export const get_stripe_account_details = async ({
  account_id,
}: {
  account_id: string;
}) => {
  console.log('account _id:====>', account_id);
  let res = await axios
    .get(process.env.STRIPE_API_BASE_URL + `v1/accounts/${account_id}`, {
      headers: {
        Authorization: `Bearer sk_test_51LWyU1I08O11o6eKSWFgmWDTlCGHLI99XrsjUneMC4Y4yV7GcUb6vNkLy1bpLNP2DMZGlRCBXR3oZRUykmwroWdQ00JRETnHmk`,
      },
    })
    .then((res: any) => {
      console.log('res.data 11=', res.data);
      return res.data;
    })
    .catch((err: any) => {
      console.log('error line 18===>', err.response);
      return err.response;
    });
  return res;
};
