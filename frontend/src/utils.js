// utils meaning use aane wale functions
import { keyframes } from "styled-components";

import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  console.log("handleSuccess toastify");
  toast.success(msg, { position: "top-right" });
};

export const handleError = (msg) => {
  toast.error(msg, { position: "top-right" });
};

//animation ***************

export const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
//******************************* */
