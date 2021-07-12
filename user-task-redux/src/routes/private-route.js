import { Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from '../auth/authentication';
import Layout from '../components/layout/layout';


export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (isAuthenticated()) {
                    return (
                        <>
                            {/* <Layout></Layout> */}
                            <Component {...props} />
                        </>)
                }
                else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }}>
                        </Redirect>
                    );
                }
            }
        } />
    );

}