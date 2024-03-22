import { memo } from "react";
import cn from "classnames";
import style from "./field.module.scss";
import { EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons'

export default memo(
  ({ register, type, name, error = false, helperText = "",visible, visibleHandler, ...rest }) => {
    let dynamicField = style.inputField
    if(name==="pass"){
      dynamicField = style.passField
    }
    return (
      <>
      <div className={cn(dynamicField, error && style.inputField__error)}>
        <input type={type} {...register(name)} {...rest} />
        {name==="pass" && <div className="p-2 cursor-pointer" onClick={visibleHandler}>{visible? <EyeOutlined/>: <EyeInvisibleOutlined/>}</div>}
      </div>
      {error && <p className={style.error}>{helperText}</p>}
      </>
    );
  }
);
