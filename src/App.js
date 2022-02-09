import "bootstrap/dist/css/bootstrap-reboot.css";
import React from "react";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { FullPageSpinner } from "./components/lib";
import * as colors from "./styles/colors";
import { useAsync } from "./utils/hooks";
import * as auth from "./auth-provider";

async function getToken() {
  let token = null;
  token = await auth.getToken();
  return token;
}

function App() {
  const {
    data: token,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    run(getToken());
  }, [run]);

  const login = (form) => auth.login(form).then((token) => setData(token));
  const logout = () => {
    auth.logout();
    setData(null);
  };

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.red,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    return token ? (
      <AuthenticatedApp token={token} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} />
    );
  }
}

export { App };
