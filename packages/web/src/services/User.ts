import { fetch } from "@/utils/fetch";

class UserDataService {
  async fetch(query: any) {
    return await fetch({
      url: "agents",
      method: "GET",
      data: query,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getUser(type: string, code: string, query: any) {
    return await fetch({
      url: `${type}/${code}`,
      method: "GET",
      data: query || {},
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getAgencyPosts(code: string, query: any) {
    return await fetch({
      url: `agents/${code}/posts`,
      method: "GET",
      data: query || {},
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export default new UserDataService();
