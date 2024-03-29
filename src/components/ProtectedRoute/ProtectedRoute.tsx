import { useSelector } from "../../utils/hooks";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import { FC } from "react";
import { IProtectedRoute } from "../../utils/types";

const ProtectedRoute: FC<IProtectedRoute> = ({
  anonymous = false,
  children,
}) => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.profileReducer.isAuth);
  const isAuthChecked = useSelector(
    (state) => state.profileReducer.isAuthChecked
  );
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (anonymous && !isAuth) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location.pathname },
        }}
      />
    );
  }

  if (!anonymous && isAuth) {
    return <Redirect to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
