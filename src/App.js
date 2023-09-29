import { Fragment, useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRouter } from "./router/index";
import { DefaultLayout } from "../src/layouts";
import { UserContext } from "./hooks/useContect";
import { fetchUserCurrent } from "./apiServices/userServices.js";
import ModalLogIn from "./components/Modal/modalLogIn";
import { store } from "./redux/store";
import { connect } from "react-redux";

function App(props) {
  // thực hiện gọi data currentuser

  const [showModal, setShowModal] = useState(store.getState().status);

  const [isloading, setIsLoading] = useState(true);
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (!isloading) {
      return;
    }
    handleRenderUser();
    setIsLoading(false);
  });

  const handleRenderUser = async () => {
    let res = await fetchUserCurrent();
    if (res && res.status === 401) {
      return;
    } else {
      login(res);
      return;
    }
  };

  return (
    <>
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

      <ModalLogIn isVisible={props.state} />
    </>
  );
}

function mapStateToProps(state) {
  console.log(state.status);
  return {
    state: state.status,
  };
}

export default connect(mapStateToProps)(App);
