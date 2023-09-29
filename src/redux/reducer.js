import { Types } from "./type";

const initalState = {
  status: false,
};

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case Types.openModalLogin: {
      console.log("open", state);
      return { ...state, status: true };
    }
    case Types.closeModalLogin: {
      console.log("close", state);
      return { ...state, status: false };
    }
    default:
      return state;
  }
};
