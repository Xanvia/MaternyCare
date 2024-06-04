import { useParams } from "react-router-dom";
import { categories } from "../data/Data";
import SearchIcon from "@mui/icons-material/Search";

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? "");

  const post = categories
    .flatMap((category) => category.content)
    .find((item) => item.id === postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="mx-10">
      <div className="flex justify-between mt-7">
        <p className="hidden lg:block">
          Pages / <span className="text-text_color_2">Guide</span>
        </p>

        <div className="lg:flex items-center relative hidden mr-10">
          <SearchIcon className="absolute left-3 " />
          <input
            className="border-2 border-gray-300 bg-white h-10 pl-10 pr-16 rounded-lg text-sm focus:outline-none "
            type="search"
            name="search"
            placeholder="Search any keywords"
          />
        </div>
      </div>
      <h1 className="text-center text-3xl text-[#0D99FF] lg:hidden">
        Mother's Guide
      </h1>
      <div className="py-10">
        <div className="text-text_color_2">
          <img
            src={post.img}
            alt="category"
            className="sm:float-left llg:w-1/3  sm:w-1/2 mr-10"
          />
          <h1 className="text-4xl pt-4 mb-5  text-text_color_1">
            {post.title}
          </h1>
          <p className="text-lg mb-5 font-medium">{post.subtitle}</p>
          <p className="text-base mt-3">{post.content.para1}</p>
          <p className="text-base mt-3">{post.content.para2}</p>
          <p className="text-base mt-3">{post.content.para3}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
