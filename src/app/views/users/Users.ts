import DefaultFormPage from "./forms/DefaultForm";

import ListingTutoresPage from "./pages/tutores/listing/Listing";
import FormTutoresPage from "./pages/tutores/form/Form";
import DetailsFormPage from "./pages/tutores/details/Details";

import ListingEmployeesPage from "./pages/employee/listing/Listing";
import CreateEmployeesPage from "./pages/employee/form/Create";
/*
import DetailsFormPage from "./pages/tutores/details/Details";*/

namespace Users {
    export const DefaultForm = DefaultFormPage;

    export namespace Tutores {
        export const Listing = ListingTutoresPage;
        export const Form = FormTutoresPage;
        export const Details = DetailsFormPage;
    }

    export namespace Employees{
        export const Listing = ListingEmployeesPage;
        export const Create = CreateEmployeesPage;
        export const Details = DetailsFormPage;
    }
}

export default Users;