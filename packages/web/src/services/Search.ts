import { fetch } from "@/utils/fetch";

class SearchDataService {
  async search(string: string) {
    return await fetch({
      url: "searches",
      method: "GET",
      data: {
        keyword: string
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export default new SearchDataService();
