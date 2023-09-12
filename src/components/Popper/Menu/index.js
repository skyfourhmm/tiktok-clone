import Tippy from "@tippyjs/react/headless";
import {Wrapper as PopperWrapper} from "../../Popper/index.js";
import MenuItems from "./MenuItems.js";
import Header from "./Header.js";
import { useState } from "react";
    
function Menu({ children, items = [] , sendCurrentUser}) {

    const [history, setHistory] = useState([{data:items}])
    const current = history[history.length - 1]

    const handleLogOut = () => {
      const data = false
      sendCurrentUser(data)

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    }

    const renderItem = () => {
        return current.data.map((item, index) => {
          let isParent = !!item.children
          let isSeparation = !!item.separation

          return <MenuItems key={index} data={item} onClick={() => {
            if(isParent) {
              setHistory( (prev) => [...prev, item.children])
            }
            if(isSeparation) {
              handleLogOut()
            }
          }}/>
        })
    }

    
    return ( <Tippy
        arrow={true}
        delay={[0, 300]}
        interactive={true}
        placement="top-start"
        render={(attrs) => (
          <div className="w-224" tabIndex="-1" {...attrs}>
            <PopperWrapper>
                {history.length > 1 && <Header title={'Language'} onBack={() => {
                    setHistory( (prev) => {return prev.slice(0, prev.length - 1)} )
                }}/>}
                {renderItem()}
            </PopperWrapper>
          </div>
        )}
        onHidden={ () => {
          setHistory( (prev) => {return prev.slice(0, 1)} )
        }}
        hideOnClick = {false}
      >
      {children}
      </Tippy> );
}

export default Menu;