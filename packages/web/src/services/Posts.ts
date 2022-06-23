import {fetch} from "@/utils/fetch";

class PostsDataService {
    async fetch (props: any) {
        return await fetch({
            isServer: props.isServer,
            url: 'posts',
            method: 'GET',
            data: props.data,
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }

    async fetchSeoMeta (props: {isServer: boolean, data: any}) {
        return await fetch({
            isServer: props.isServer,
            url: 'posts?_seo=1',
            method: 'GET',
            data: props.data,
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }

    async fetchByCode (props: {isServer: boolean, code: string}) {
        return await fetch({
            isServer: props.isServer,
            url: `posts/${props.code}`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            }
          })
    }

    async fetchOutstanding (props: {isServer: boolean}) {
        return await fetch({
            isServer: props.isServer,
            url: 'posts?_outstanding=1',
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }

    async create (data : any, token : string) {
        return await fetch({
            url: `accounts/${new Date().getTime()}/posts`,
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
          })
    }

    async getSuggested (id: string) {
        return await fetch({
            url: `posts/${id}/recommendation`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }

    async fetchAttributes () {
        return await fetch({
            url: `posts-attributes`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }

    async fetchSpecialties (query : any) {
        return await fetch({
            url: `posts-specialties`,
            method: 'GET',
            data: query,
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }

    async fetchCategories () {
        return await fetch({
            url: `posts-categories`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "Accept":"application/json"
            }
          })
    }
}
export default new PostsDataService();