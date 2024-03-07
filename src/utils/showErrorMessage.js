import { enqueueSnackbar } from "notistack";

export default (error) =>{
  return enqueueSnackbar(error.response.data.error, { variant: "error" });
}
  
