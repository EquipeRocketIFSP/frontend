import NavbarComponent from "./navbar/Navbar";
import SearchBarComponent from "./search-bar/SearchBar";
import ListingComponent from "./listing/Listing";
import LoadingScreenComponent from "./loading-screen/LoadingScreen";
import MultiGroupsComponent from "./multi-groups/MultiGroups";
import AddressComponent from "./address/Address";
import CEPComponent from "./cep/CEP";
import CNPJComponent from "./cnpj/CNPJ";
import UFComponent from "./uf/UF";
import ContactsComponent from "./contacts/Contacts";
import BreadcrumbsComponent from "./breadcrumbs/Breadcrumbs";
import FormSubmitComponent from "./form-submit/FormSubmit";
import {FormSubmitContext as FormSubmitComponentContext} from "./form-submit/FormSubmit";

namespace Components {
    export const Navbar = NavbarComponent;
    export const SearchBar = SearchBarComponent;
    export const Listing = ListingComponent;
    export const LoadingScreen = LoadingScreenComponent;
    export const MultiGroups = MultiGroupsComponent;
    export const Address = AddressComponent;
    export const CEP = CEPComponent;
    export const CNPJ = CNPJComponent;
    export const UF = UFComponent;
    export const Contacts = ContactsComponent;
    export const Breadcrumbs = BreadcrumbsComponent;
    export const FormSubmit = FormSubmitComponent;
    export const FormSubmitContext = FormSubmitComponentContext;
}

export default Components;