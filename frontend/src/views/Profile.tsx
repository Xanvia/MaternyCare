import { Edit } from "../assets/icons/Icons";

const Profile = () => {
  return (
    <div className="mx-10 bg-white rounded-xl p-5">
      {/* <h2 className="text-base text-text_color_1 font-medium mb-5">
        My Profile
      </h2> */}
      <div className="border-solid border-2 rounded-lg md:py-2 px-5 sm:flex justify-between items-center py-5">
        <div className="flex flex-col items-center bg-white xs:flex-row xs:max-w-xl">
          <img
            className="object-cover w-24 rounded-full h-24"
            src="https://randomuser.me/api/portraits/women/94.jpg"
            alt=""
          />
          <div className="flex flex-col  justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-text_color_1 dark:text-white">
              Ushani Anuruddhika
            </h5>
            <p className="mb-1 font-normal text-text_color_2 dark:text-gray-400">
              30 years old
            </p>
            <p className="mb-1 font-normal text-text_color_2 dark:text-gray-400">
              Badulla, Srilanka
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-blue_primary hover:text-white border border-blue_primary hover:bg-blue_primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 h-1/2 w-full sm:w-auto"
        >
          <Edit className="mr-2 p-0.5" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
