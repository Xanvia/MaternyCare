import { useEffect, useState } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import DeleteCofirmation from "../modals/DeleteCofirmation";
import AddNoticeModal from "../modals/AddNoticeModal";
import UpdateNoticeModal from "../modals/UpdateNoticeModal";

const Notices = () => {
  const BASE_URL = "http://localhost:3000/";
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const colors = ["#BA97FE", "#0D99FF", "#F580AB", "#F1CB3A", "#3AF16C"];
  const role = (localStorage.getItem("role") || "")
    .replace(/"/g, "")
    .trim()
    .toLowerCase();
  console.log("role from notices page: " + role);

  useEffect(() => {
    const getNotices = () => {
      setLoading(true);
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}notices`,
        // headers: {
        //   Authorization: `Bearer`,
        // },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response.data);
          setNotices(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getNotices();
  }, []);

  console.log("typeeeeeeeeeeeeeeee: " + typeof role); // Logs the type of the variable 'role'

  return (
    <div className="mx-11 my ">
      <div className="flex justify-between my-4 items-center ">
        <h1 className="mt-9 mb-4 text-lg">Notices</h1>
        <div className="flex justify-end">
          {role !== "mother" && <AddNoticeModal />}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          <Rings
            visible={true}
            height="80"
            width="80"
            color="#BA97FE"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          notices.map(
            (
              notice: {
                title: string;
                message: string;
                createdAt: string;
                id: string;
              },
              index: number
            ) => {
              const date = new Date(notice.createdAt);
              const formattedDate = date.toISOString().split("T")[0];

              return (
                <div
                  key={index}
                  className="px-8 py-5 text-white rounded-2xl mb-8 animate-fadeIn shadow-md max-w-full h-auto flex flex-col justify-between"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  <div>
                    <h1 className="mb-2 font-medium text-xl">{notice.title}</h1>
                    <p className="font-normal text-[16px]">{notice.message}</p>
                    <p className="text-xs mt-3">Posted on: {formattedDate}</p>
                  </div>
                  <div className="md:flex">
                    {role !== "mother" && (
                      <>
                        <DeleteCofirmation noticeId={notice.id} />
                        <UpdateNoticeModal
                          noticeId={notice.id}
                          noticeTitle={notice.title}
                          noticeMessage={notice.message}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
};

export default Notices;
