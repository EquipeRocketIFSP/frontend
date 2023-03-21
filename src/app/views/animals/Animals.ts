import ListingPage from "./pages/listing/Listing";
import FormPage from "./pages/form/Form";
import DetailsPage from "./pages/details/Details";
import DefaultFormPage from "./forms/DefaultForm";

namespace Animals {
    export const DefaultForm = DefaultFormPage;
    export const Details = DetailsPage;
    export const Listing = ListingPage;
    export const Form = FormPage;
}

export default Animals;