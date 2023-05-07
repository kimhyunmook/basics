import axios from "axios"

// export const commonAPi = async (body) => {
//     if (body.url === undefined) {
//         console.error('url을 넣어 주세요 ex) url: "menu"');
//         return;
//     }
//     return axios
//         .post(`/api/setting/${body.url}`, body.payload)
//         .then(res => res.data)
//         .catch(error => error);
// }

export const commonAPi = {
    post: async (body) => {
        return axios
            .post(`/api/setting/${body.url}`, body.payload)
            .then(res => res.data)
            .catch(error => error);
    },
    get: async (body) => {
        return axios
            .get(`/api/setting/${body.url}`, body.payload)
            .then(res => res.data)
            .catch(error => error);
    }
}