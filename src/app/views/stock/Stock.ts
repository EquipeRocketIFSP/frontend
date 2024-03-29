import DefaultForm from "./pages/form/components/DefaultForm";
import DetailsPage from "./pages/details/Details";
import ListingPage from "./pages/listing/Listing";
import CreatePage from "./pages/form/Create";
import EditPage from "./pages/form/Edit";

namespace Stock {
    export const Form = DefaultForm;

    export const Details = DetailsPage;

    export const Listing = ListingPage;

    export const Create = CreatePage;

    export const Edit = EditPage;
}


export default Stock;