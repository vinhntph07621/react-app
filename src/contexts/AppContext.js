import React, {
  Children,
  useState,
  useEffect,
  Cookies,
  isDevEnv,
  setSearchText,
} from "react";
//alert
import swal from "sweetalert";
import { isEmpty } from "lodash";
export const AppContext = React.createContext({
  userInfo: {},
});
function AppProvider(props) {
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const {
        data: { user },
      } = JSON.parse(token);
      setUser(user);
      setUserLoaded(true);
    } else {
      setUserLoaded(true);
    }
  }, []);

  // useEffect(() => {
  //   if (!isEmpty(user)) {
  //     setIsLoggedIn(true);
  //   }
  // }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, isLoggedIn, userLoaded }}>
      {Children.toArray(props.children)}
    </AppContext.Provider>
  );
}
export default AppProvider;
