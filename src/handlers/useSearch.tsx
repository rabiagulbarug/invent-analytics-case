import {useQuery} from "@tanstack/react-query";
import http from "../utils/http";
import {API_ENDPOINTS} from "../types/api-endpoint";

const API_KEY = '225b51b8'

export type SearchResponse = {
    Response: 'True' | 'False'
    Search?: { Poster: string, Title: string, Type: 'movie' | 'series', Year: string, imdbID: string }[]
    totalResults?: number
}

interface SearchProps {
    search?: string
    page?: number
    year?: number
    type?: 'movie' | 'series' | 'episode'
}

async function searchHandler({search, page, year, type}: SearchProps): Promise<SearchResponse> {
    return await http.get(`${API_ENDPOINTS.SEARCH}?s=${search && search.length > 2 ? search : 'pokemon'}&apikey=${API_KEY}&page=${page}${type ? `&type=${type}` : ''}${year ? `&y=${year}` : ''}`).then((res) => res.data);
}

export const useSearch = ({search, page, year, type}: SearchProps) => {
    return useQuery({
            queryKey: [API_ENDPOINTS.SEARCH, search, page, year, type],
            queryFn: () => searchHandler({search, page, year, type})
        }
    )
};
