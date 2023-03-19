import DefaultFormPage from "./forms/DefaultForm";

import ListingTutoresPage from "./pages/tutores/listing/Listing";
import FormTutoresPage from "./pages/tutores/form/Form";

namespace Users {
    export const DefaultForm = DefaultFormPage;

    export namespace Tutores {
        export const Listing = ListingTutoresPage;
        export const Form = FormTutoresPage;
    }
}

export default Users;