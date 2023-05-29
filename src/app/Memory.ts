import {AxiosHeaders} from "axios";

interface IMemory {
    authorites: string[],
    headers: AxiosHeaders
}

const Memory: IMemory = {
    authorites: [],
    headers: new AxiosHeaders().setContentType("application/json")
}

export default Memory;