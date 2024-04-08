import {useQuery} from "@tanstack/react-query";
import http from "../utils/http";
import {API_ENDPOINTS} from "../types/api-endpoint";

const API_KEY = '225b51b8'
async function detailHandler(id : string) {
    return await http.get(`${API_ENDPOINTS.DETAIL}?i=${id}&apikey=${API_KEY}`).then((res) => res.data);
}

export const useMovieDetail = (id: string) => {
    return useQuery({
            queryKey: [API_ENDPOINTS.DETAIL, id],
            queryFn: () => detailHandler(id)
        }
    )
};
