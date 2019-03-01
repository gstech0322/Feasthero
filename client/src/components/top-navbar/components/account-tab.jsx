import { useSelector } from "react-redux"
import { selectAccount } from "../../../services/auth/selectors";
import { HashLink as Link } from 'react-router-hash-link';

export default function AccountTab() {
    const isAtLoginPage = useSelector(state => state.auth.atLoginPage);
    const accountData = useSelector(selectAccount);;

    if (accountData)
      return <Link smooth to="/account">Account</Link>
    if (isAtLoginPage)
      return <Link smooth to="/auth/register">Register</Link>
    return <Link smooth to="/auth/login">Login</Link>
}