import {AxiosHeaders} from "axios";

namespace Memory {
    export const authorites: string[] = [];
    export const headers: AxiosHeaders = new AxiosHeaders().setContentType("application/json");
}

export default Memory;