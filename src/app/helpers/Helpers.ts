import MasksComponent from "./components/Masks";
import LocalStorageComponent from "./components/LocalStorage";
import SessionStorageComponent from "./components/SessionStorage";
import AddressComponent from "./components/Address";

namespace Helpers {
    export const Masks = MasksComponent;
    export const LocalStorage = LocalStorageComponent;
    export const SessionStorage = SessionStorageComponent;
    export const Address = AddressComponent;
}

export default Helpers;