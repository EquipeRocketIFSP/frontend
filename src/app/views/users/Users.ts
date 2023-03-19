import DefaultFormPage from "./forms/DefaultForm";

import ListingTutoresPage from "./pages/tutores/listing/Listing";
import FormTutoresPage from "./pages/tutores/form/Form";
import DetailsFormPage from "./pages/tutores/details/Details";

namespace Users {
    export const DefaultForm = DefaultFormPage;

    export namespace Tutores {
        export const Listing = ListingTutoresPage;
        export const Form = FormTutoresPage;
        export const Details = DetailsFormPage;
    }
}

export default Users;