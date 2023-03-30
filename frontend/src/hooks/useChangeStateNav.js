import { useEffect } from "react";
import { useDispatch } from "react-redux";
import headerSlice from "~/layouts/components/Header/headerSlice";

function useChangeStateNav(location) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(headerSlice.actions.navigationChange(location.pathname));
  });
}

export default useChangeStateNav;
