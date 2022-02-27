import { State } from "@/store";
import axios, { Axios, AxiosError } from "axios";
import { Store } from "vuex";
import {
  PostSignupBody,
  NSResponse,
  AuthSuccessResponse,
  ErrorObj,
  PostLoginBody,
  GetUserSuccessResponse,
} from "./ApiTypes";
import { Project } from "./NotificationSignalTypes";

export default class ServerApi {
  static store: Store<State>;

  static http: Axios;

  static init(store: Store<State>): void {
    this.store = store;

    this.http = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}/api`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static setToken(token: string) {
    ServerApi.http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  static deleteToken() {
    if (ServerApi.http.defaults.headers.common["Authorization"]) {
      delete ServerApi.http.defaults.headers.common["Authorization"];
    }
  }

  static async handleErrorResponse<T>(e: unknown): Promise<NSResponse<T>> {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError;
      const errors: ErrorObj[] = error.response?.data.errors;
      if (errors) {
        const rootError = errors.find((e) => e.param == "root");
        if (rootError) {
          this.store.dispatch("setError", rootError.msg);
        }
      }
      return {
        ok: false,
        data: error.response?.data.errors,
      };
    } else {
      throw e;
    }
  }

  static async postSignup(
    body: PostSignupBody
  ): Promise<NSResponse<AuthSuccessResponse>> {
    try {
      const response = await ServerApi.http.post(`/auth/create-account`, body);
      return {
        ok: true,
        data: response.data,
      };
    } catch (e) {
      return ServerApi.handleErrorResponse(e);
    }
  }

  static async postLogin(
    body: PostLoginBody
  ): Promise<NSResponse<AuthSuccessResponse>> {
    try {
      const response = await ServerApi.http.post(`/auth/login`, body);
      return {
        ok: true,
        data: response.data,
      };
    } catch (e) {
      return ServerApi.handleErrorResponse(e);
    }
  }

  static async getUser(): Promise<NSResponse<GetUserSuccessResponse>> {
    try {
      const response = await ServerApi.http.get(`/users/get-user`);
      return {
        ok: true,
        data: response.data,
      };
    } catch (e) {
      return ServerApi.handleErrorResponse(e);
    }
  }

  static async getProjects(): Promise<NSResponse<Project[]>> {
    try {
      const response = await ServerApi.http.get(`/projects`);
      return {
        ok: true,
        data: response.data,
      };
    } catch (e) {
      return ServerApi.handleErrorResponse(e);
    }
  }
}
