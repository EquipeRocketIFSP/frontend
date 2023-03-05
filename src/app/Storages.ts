import Contracts from "./contracts/Contracts";
import Helpers from "./helpers/Helpers";

namespace Storages {
    export const userStorage = new Helpers.LocalStorage<Contracts.UserData>("UserData");
    export const referrerStorage = new Helpers.SessionStorage<string>("Referrer");
    export const signInStorage = new Helpers.SessionStorage<Contracts.SignInFormData>("SignInForm");
}

export default Storages;