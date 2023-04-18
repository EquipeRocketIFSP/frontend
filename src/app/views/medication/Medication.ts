import DefaultForm from "./forms/DefaultForm";
import DetailsPage from "./pages/details/Details";
import ListingPage from "./pages/listing/Listing";
import CreatePage from "./pages/form/Create";

namespace Medication {
    export const Form = DefaultForm;

    export const Details = DetailsPage;

    export const Listing = ListingPage;

    export const Create = CreatePage;
}


export default Medication;