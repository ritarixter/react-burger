import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default function ProtectedRoute({
  anonymous = false,
  wasOnPageForgotPassword,
  pageResetPassword,
  children,
}) {
  const history = useHistory();
  const isAuth = useSelector((state) => state.profileReducer.isAuth);
  const location = useLocation();
  if (anonymous && !isAuth) {
    console.log(location.pathname);
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
}
