import LayoutComponent from "./components/Layout";
import RestrictedLayoutComponent from "./components/RestrictedLayout";
import RestrictedFormLayoutComponent, { LayoutFormContext as LayoutFormContextInterface } from "./components/RestrictedFormLayout"

namespace Layouts {
    export const Layout = LayoutComponent;
    export const RestrictedLayout = RestrictedLayoutComponent;
    export const RestrictedFormLayout = RestrictedFormLayoutComponent;

    export type Layout = LayoutComponent;
    export type RestrictedLayout = RestrictedLayoutComponent;
    export type RestrictedFormLayout = RestrictedFormLayoutComponent;
    export type LayoutFormContext = LayoutFormContextInterface;
}

export default Layouts;