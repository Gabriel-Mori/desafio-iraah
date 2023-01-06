
import axios from "axios";
import { constants } from "../constants";

export namespace AuthService {
  export async function login(user: string, password: string) {
    return axios
      .post(`${constants.baseAPI}/api/public/auth?longToken=false`, {
        user,
        password,
      })
      .then((response) => {
        const data = response.data;

        return {
          name: data.name,
          picture: data.picture,
          token: data.token,
        };
      });
  }

  export async function me(token: string) {
    return axios.get(`${constants.baseAPI}/public/token/get/${token}`);
  }

  export async function companies(token: string) {
    return axios.get(`${constants.baseAPI}/api/public/token/organizations/${token}`);
  }
}
