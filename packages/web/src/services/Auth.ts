import { fetch } from "@/utils/fetch";

class AuthDataService {
  async getAccount(token: any) {
    return await fetch({
      url: "accounts",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async login(data: any) {
    return await fetch({
      url: "auth/login",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async logout(token: string) {
    return await fetch({
      url: "auth/logout",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async register(data: {
    email: string;
    name: string;
    phone: string;
    password: string;
    password_confirmation: string;
  }) {
    return await fetch({
      url: "auth/register",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async verify(data: {
    email: string;
    uuid: string;
    code: string;
  }) {
    return await fetch({
      url: "auth/verify-email",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async phoneVerification(data: {
    phone: string;
    code: string;
    uid: string;
    user_id: string;
  }) {
    return await fetch({
      url: "auth",
      method: "PUT",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async forgotPassword(data: {
    email: string;
  }) {
    return await fetch({
      url: "password/email",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
}
export default new AuthDataService();
