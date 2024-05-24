import Drawer from "../components/Drawer";
import RightBar from "../components/RightBar";
import FeedLayout from "./FeedLayout";

const BaseLayout = () => {
  return (
    <div className="flex bg-[#F5F5F5]">
      <Drawer />
      <div className="lg:ml-[300px] ml-0 w-full ">
        <FeedLayout />
      </div>
      <RightBar />
    </div>
  );
};

export default BaseLayout;
