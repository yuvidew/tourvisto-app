
const IP = "http://192.168.1.2:2000/v1"

export const baseURL = {
  sign_in: `${IP}/user/auth/sign-in`,
  sign_up: `${IP}/user/auth/sign-up`,
  get_trips : `${IP}/trip/get-all-trips`,
  get_trips_by_id : `${IP}/trip/get-trip-by-id`
};
