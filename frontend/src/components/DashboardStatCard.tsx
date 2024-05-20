import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

const DashboardStatCard = ({
  image,
  color,
}: {
  image: string;
  color: string;
}) => {
  return (
    <div className="bg-white py-12 px-8 h-42 rounded-lg">
      <div className="grid llg:grid-cols-2 grid-cols-2 gap-2">
        <div
          className={` xl:col-span-1 rounded-full ${color} w-16 h-16 p-4 flex justify-center m-auto`}
        >
          <img src={image} />
        </div>

        <div className="flex items-center justify-center">
          <div>
            <div>
              <span className="text-2xl text-text_color_1 font-medium">5</span>{" "}
              <span className="font-normal text-text_color_2">kicks</span>
            </div>
            <div>
              <h3 className="text-text_color_1">Kick count</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default DashboardStatCard;
