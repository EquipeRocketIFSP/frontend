import {AxiosHeaders} from "axios";

interface IMemory {
    authorites: string[],
    headers: AxiosHeaders,
    hasTechnicalResponsible: boolean
}

const Memory: IMemory = {
    authorites: [],
    headers: new AxiosHeaders().setContentType("application/json"),
    hasTechnicalResponsible: false
}

export default Memory;