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
      <div>
        <h2>{post.title}</h2>
        <p>{post.subtitle}</p>
        <img src={post.img} alt="category" />
      </div>
    </div>
  );
};

export default SinglePost;
