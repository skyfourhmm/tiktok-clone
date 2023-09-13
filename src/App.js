import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRouter } from "./router/index";
import { DefaultLayout } from "../src/layouts";
import { useContext } from "react";
import { UserContext } from "./hooks/useContect";
import { fetchUserCurrent } from "./apiServices/userServices.js";

function App() {
  const { login } = useContext(UserContext);

  useEffect( () => {
    const handleRenderUser = async () => {
      let res = await fetchUserCurrent();
      if(res && res.status === 401) {
        return
      }
      login(res)
    };
    handleRenderUser();
  })

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouter.map((router, index) => {
            let Layout = DefaultLayout;

            if (router.layout) {
              Layout = router.layout;
            } else if (router.layout === null) {
              Layout = Fragment;
            }

            const Page = router.component;
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
