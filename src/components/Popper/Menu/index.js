import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";
import { Wrapper as PopperWrapper } from "../../Popper/index.js";
import MenuItems from "./MenuItems.js";
import Header from "./Header.js";
import { UserContext } from "../../../hooks/useContect.js";
import { useState, useContext } from "react";

function Menu({ children, items = [], sendCurrentUser }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];
  const { logout, user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    const data = false;
    sendCurrentUser(data);

    logout();
    window.location.reload();
  };

  const renderItem = () => {
    return current.data.map((item, index) => {
      let isParent = !!item.children;
      let isSeparation = !!item.separation;
      let isToggle = !!items.toggle;

      return (
        <MenuItems
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            }
            if (isSeparation) {
              handleLogOut();
            }
            if (isToggle) {
              console.log(122);
            }
            if (item.type === "profile") {
              const nickname = user?.data?.data?.nickname;
              navigate("@" + nickname);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      arrow={true}
      delay={[0, 300]}
      interactive={true}
      placement="top-start"
      render={(attrs) => (
        <div className="w-224" tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {history.length > 1 && (
              <Header
                title={"Language"}
                onBack={() => {
                  setHistory((prev) => {
                    return prev.slice(0, prev.length - 1);
                  });
                }}
              />
            )}
            {renderItem()}
          </PopperWrapper>
        </div>
      )}
      onHidden={() => {
        setHistory((prev) => {
          return prev.slice(0, 1);
        });
      }}
      hideOnClick={false}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
