import { useEffect } from "react";
import { logout } from '../../auth/authentication';
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        logout(() => {
            history.push('/');
        })

    }, []);

    return (
        <>
        </>
    )
}

export default Logout;