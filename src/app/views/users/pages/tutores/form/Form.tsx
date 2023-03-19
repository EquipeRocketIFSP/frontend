import Users from "../../../Users";

export default function Form(): JSX.Element {
    return <Users.DefaultForm title="Dados do tutor" clientPathname="tutores" apiPathname="tutor"/>;
}