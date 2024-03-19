import { memo } from "react";
import cn from "classnames";
import style from "./select.module.scss";

export default memo(({ register, name, options = [],error = false, helperText = "", ...rest }) => {
  return (
    <div className={cn(style.inputField, error && style.inputField__error)}>
      <select {...register(name)} {...rest}>
        {options.map(( option ) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={style.error}>{helperText}</p>}
    </div>
  )
});


/* export default memo(
  ({ register, name, error = false, helperText = "", ...rest }) => {
    return (
      <div className={cn(style.inputField, error && style.inputField__error)}>
        <input {...register(name)} {...rest} />
        {error && <p className={style.error}>{helperText}</p>}
      </div>
    );
  }
);
 */