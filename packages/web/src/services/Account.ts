import { fetch } from "@/utils/fetch";

class AccountDataService {
  async getAccount(props : any) {
    return await fetch({
      url: "accounts",
      method: "GET",
      isServer: props.isServer,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
  }

  async updateProfile(token: string, data: any) {
    return await fetch({
      url: "accounts",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  }  
  
  async validateUnique(token: string, data: any) {
    return await fetch({
      url: "accounts/validate",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async verifyFirebaseUser(token: string, data: any) {
    return await fetch({
      url: "accounts/verify-firebase-user",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateStatusPosts(token: string, id: string, status: string) {
    return await fetch({
      url: "accounts/posts-status/" + id,
      method: "PUT",
      data: {
        'status'  : status
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getPosts({token, filter, isServer} : 
      {
        isServer: boolean, 
        token: string, 
        filter: any
      }) {
    return await fetch({
      url: "accounts/posts",
      method: "GET",
      data: filter,
      isServer: isServer,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new AccountDataService();
