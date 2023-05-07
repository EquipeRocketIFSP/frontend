import DefaultFormPage from "./forms/DefaultForm";

import ListingTutoresPage from "./pages/tutores/listing/Listing";
import FormTutoresPage from "./pages/tutores/form/Form";
import DetailsTutoresPage from "./pages/tutores/details/Details";

import ListingEmployeesPage from "./pages/employee/listing/Listing";
import CreateEmployeesPage from "./pages/employee/form/Create";
import EditEmployeesPage from "./pages/employee/form/Edit";
import DetailsEmployeesPage from "./pages/employee/details/Details";

namespace Users {
    export const DefaultForm = DefaultFormPage;

    export namespace Tutores {
        export const Listing = ListingTutoresPage;
        export const Form = FormTutoresPage;
        export const Details = DetailsTutoresPage;
    }

    export namespace Employees {
        export const Listing = ListingEmployeesPage;
        export const Create = CreateEmployeesPage;
        export const Edit = EditEmployeesPage;
        export const Details = DetailsEmployeesPage;
    }
}

export default Users;