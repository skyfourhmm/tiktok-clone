import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRouter } from "./router/index";
import { DefaultLayout } from "../src/layouts";
import { useContext } from "react";
import { UserContext } from "./hooks/useContect";


function App() {

  const { user } = useContext(UserContext);

  console.log(user)

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouter.map((router, index) => {
            let Layout =  DefaultLayout;

            if(router.layout) {
              Layout = router.layout
            } else if (router.layout === null) {
              Layout = Fragment
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
