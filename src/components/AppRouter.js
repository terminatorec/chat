import React, { useContext } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Router,
  Link,
  Redirect,
  Navigate,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
// import { useAuthState } from 'react-firebase-hooks/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { SmileContext } from "../context";
// import { privateRoutes, publicRoutes } from "../router/router";

const AppRouter = () => {
  // const [user] = useAuthState()
  // const user = false
  const {auth} = useContext(SmileContext)
  const [user, loading, error] = useAuthState(auth);

  
  return user  ? ( //если пользователь залогинен то вернется массив с данными, если не залогинен то вернется null
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          element={route.element}
          path={route.path}
          exact={route.exact}
          key={Date.now()}
        />
      ))}
      <Route path="*" element={<Navigate to="/chat/chat" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          element={route.element}
          path={route.path}
          exact={route.exact}
          key={Date.now()}
        />
      ))}
      <Route path="*" element={<Navigate to="/chat/login" />} />
    </Routes>
  );
};

export default AppRouter;
