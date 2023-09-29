import { Types } from "./type";

export const openModalLogin = () => {
  return {
    type: Types.openModalLogin,
  };
};

export const closeModalLogin = () => {
  return {
    type: Types.closeModalLogin,
  };
};
