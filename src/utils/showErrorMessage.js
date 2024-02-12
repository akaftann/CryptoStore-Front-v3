import { enqueueSnackbar } from "notistack";

export default (error) =>{
  console.log('its error: ',error)
  return enqueueSnackbar(error.response.data.error, { variant: "error" });

}
  
