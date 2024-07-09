import { toast } from "react-toastify";

const notify = (data) => toast(data);

export const Toaster = (message) => {
  notify(message)
  return
};



export default Toaster