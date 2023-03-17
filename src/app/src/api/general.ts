import axios, { AxiosResponse } from "axios";
import {
  SERVER_ADDRESS,
  CACHE,
  IS_ALIVE,
  SHUTDOWN,
  GET_GPU,
  SET_GPU,
  CLEAR_GPU,
  AUTOSAVE_QUERY,
  AUTOSAVE_TOGGLE,
} from "@portal/constants/api";

export function APIIsAlive(isElectron: boolean): Promise<AxiosResponse<any>> {
  return axios.get(SERVER_ADDRESS + IS_ALIVE, { params: { isElectron } });
}

export function APIShutdown(
  deleteCache?: boolean
): Promise<AxiosResponse<any>> {
  return axios.get(SERVER_ADDRESS + SHUTDOWN, {
    params: {
      ...(deleteCache ? { deleteCache } : {}),
    },
  });
}

/* -------------- CACHE API -------------- */

export function APILoadCache(): Promise<AxiosResponse<any>> {
  return axios.post(SERVER_ADDRESS + CACHE);
}

export function APIRejectCache(): Promise<AxiosResponse<any>> {
  return axios.put(SERVER_ADDRESS + CACHE);
}

/* -------------- AUTOSAVE API -------------- */

export function APIAutosaveQuery(): Promise<AxiosResponse<any>> {
  return axios.get(SERVER_ADDRESS + AUTOSAVE_QUERY);
}

export function APIAutosaveToggle(flag: boolean): Promise<AxiosResponse<any>> {
  return axios.post(
    `${SERVER_ADDRESS + AUTOSAVE_TOGGLE}/${flag ? "on" : "off"}`
  );
}

/* -------------- GPU API -------------- */

export function APIGetGPU(): Promise<AxiosResponse<any>> {
  return axios.get(SERVER_ADDRESS + GET_GPU);
}

export function APISetGPU(): Promise<AxiosResponse<any>> {
  return axios.post(SERVER_ADDRESS + SET_GPU);
}

export function APIClearGPU(): Promise<AxiosResponse<any>> {
  return axios.post(SERVER_ADDRESS + CLEAR_GPU);
}
