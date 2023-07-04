import Lottie from "lottie-react";
import * as animationData from "./lottie-loading.json";

const Loading = ({ size = 60 }) => {
  return (
    <div>
      <Lottie animationData={animationData} style={{ height: size }} />
    </div>
  );
};

export default Loading;
