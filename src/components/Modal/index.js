import {  Fragment, useEffect, useState } from "react";
import { CloseIcon, BackIcon } from "../../../src/components/Icons/index";

function Modal({
  isVisible = false,
  onClose,
  children,
  firtPageModal,
  hideback,
  sethideback,
}) {
  const [hideAnimation, setHideAnimation] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
   
  useEffect( () => {
    let token = localStorage.getItem('token')
    if(token) {
      setIsLogin(true)
    }
  }, [])

  if (!isVisible) return null;

  const handleClose = () => {
    setTimeout( ()=> {
      onClose();
      firtPageModal(0);
      sethideback(false);
      setHideAnimation(false)
    }, 500)
    setHideAnimation(true)
  };

  const handleBack = () => {
    firtPageModal(0);
    sethideback(false);
  }

  const classClose = "bg-gray-100 rounded-full p-2 mr-5 my-5 ml-auto";

  return (
    <Fragment>
      {isLogin ?  <></> : (<div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className={hideAnimation ? 'w-[450px] bg-white rounded-lg flex flex-col h-4/5 relative animate-shrink' :'w-[450px] bg-white rounded-lg flex flex-col h-4/5 relative animate-toggle'}>
        <div className="flex justify-between">
          {hideback && (
            <button className="p-2 ml-8 my-5" onClick={handleBack}>
              <BackIcon />
            </button>
          )}
          <button
            className={
              "bg-gray-100 rounded-full p-2 mr-5 my-5" + hideback
                ? classClose
                : "bg-gray-100 rounded-full p-2 mr-5 my-5"
            }
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>)}
    
    </Fragment>
  );
}

export default Modal;
