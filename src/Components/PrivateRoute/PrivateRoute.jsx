import { useSelector } from "react-redux"
import PropTypes from 'prop-types';
import { Navigate} from "react-router-dom";


function PrivateRoute({children}) {
  
    const isAdmin = useSelector((state) => state?.auth?.user?.admin)

    if(isAdmin){
      return children;
    }
    return (
      <Navigate to="/login"/>
    )
    }

    PrivateRoute.propTypes = {
        children: PropTypes.node.isRequired,
      };
export default PrivateRoute