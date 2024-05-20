import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

const DashboardStatCard = ({
  image,
  color,
  count,
  title,
  subtitle,
}: {
  image: string;
  color: string;
  count: number;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="bg-white py-8 xs:px-6 px-4 h-42 rounded-lg">
      <div className="grid xs:grid-cols-2 grid-cols-1 gap-2">
        <div
          className={` xl:col-span-1 rounded-full ${color} w-16 h-16 p-4 flex justify-center m-auto`}
        >
          <img src={image} />
        </div>

        <div className="flex items-center llg:justify-start justify-center">
          <div>
            <div>
              <span className="text-2xl text-text_color_1 font-medium">
                {count}
              </span>{" "}
              <span className="font-normal text-text_color_2">{subtitle}</span>
            </div>
            <div>
              <h3 className="text-text_color_1">{title}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 ">
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
