import {fetch} from "@/utils/fetch";

class LocationDataService {
    async fetch (props: any) {
        return await fetch({
            isServer: props.isServer,
            url: 'locations',
            method: 'GET',
            data: props.data,
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }
}
export default new LocationDataService();