import { memo } from "react";
import style from "./button.module.scss";

export default memo(({ children, ...rest }) => (
  <button {...rest} className='button'>
    {children}
  </button>
));
