import Storages from "../../Storages";

interface Payload {
    iss: string,
    sub: string,
    iat: number,
    exp: number
}

export default class JWTData {
    private static userId: number | undefined;

    public static getUserId(): number | undefined {
        if (JWTData.userId)
            return JWTData.userId;

        const payload = JWTData.getPayload();

        if (!payload)
            return;

        JWTData.userId = parseInt(payload.sub.split(":")[0]);
        return JWTData.userId;
    }

    private static getPayload(): Payload | undefined {
        const token = Storages.userStorage.get()?.token;

        if (!token)
            return;

        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));

        return JSON.parse(jsonPayload) as Payload;
    }
}