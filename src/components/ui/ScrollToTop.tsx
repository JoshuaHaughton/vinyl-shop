import { useEffect } from "react";
import { useLocation } from "react-router";

interface Props {
  children: JSX.Element
}

const ScrollToTop = (props: Props): JSX.Element => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;