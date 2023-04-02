import FormDefaultPage from "./form/FormDefault";
import CalendarPage from "./pages/calendar/Calendar";
import CreatePage from "./pages/form/Create";
import EditPage from "./pages/form/Edit";
import Contracts from "../../contracts/Contracts";

namespace Agenda {
    export const Form = FormDefaultPage;
    export const Calendar = CalendarPage;
    export const Create = CreatePage;
    export const Edit = EditPage;

    export function validateForm(formData: FormData): Contracts.DynamicObject<string> {
        const validationErrors: Contracts.DynamicObject<string> = {};

        if (!formData.get("tutor")?.toString().length)
            validationErrors["tutor"] = "Selecione um dos tutores do animal";

        if (!formData.get("animal")?.toString().length)
            validationErrors["animal"] = "Selecione o animal";

        if (!formData.get("veterinario")?.toString().length)
            validationErrors["veterinario"] = "Selecione o veterinário";

        return validationErrors;
    }
}

export default Agenda;