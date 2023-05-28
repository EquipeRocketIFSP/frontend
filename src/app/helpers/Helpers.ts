import MasksComponent from "./components/Masks";
import LocalStorageComponent from "./components/LocalStorage";
import SessionStorageComponent from "./components/SessionStorage";
import AddressComponent from "./components/Address";
import SpecialValidationComponent from "./components/SpecialValidation";
import ReactSelectOptionFactoryComponent from "./components/ReactSelectOptionFactory";
import JWTDataComponent from "./components/JWTData";
import DateFormatComponent from "./components/DateFormat";

namespace Helpers {
    export const Masks = MasksComponent;
    export const LocalStorage = LocalStorageComponent;
    export const SessionStorage = SessionStorageComponent;
    export const Address = AddressComponent;
    export const SpecialValidation = SpecialValidationComponent;
    export const ReactSelectOptionFactory = ReactSelectOptionFactoryComponent;
    export const JWTData = JWTDataComponent;
    export const DateFormat = DateFormatComponent;
}

export default Helpers;