import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaCommentAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Community = () => {
  const [filter, setFilter] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [displayedPost, setDisplayedPosts] = useState([]);

  const { user } = useAuth();

  function reverseArray(arr) {
    let reversedArray = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversedArray.push(arr[i]);
    }
    return reversedArray;
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://agri-smart-backend.vercel.app/get-posts")
      .then((res) => res.json())
      .then((data) => {
        if (filter === "All") {
          setPosts(reverseArray(data));
          setDisplayedPosts(reverseArray(data));
        }
        if (filter === "your") {
          setDisplayedPosts(
            reverseArray(data.filter((item) => item.email === user.email))
          );
        }
        setLoading(false);
        setReloadData(false);
      });
  }, [filter, reloadData, user]);

  const handleSearch = (e) => {
    e.preventDefault();

    const text = e.target.searchtext.value.toLowerCase().trim();

    if (!text) {
      setDisplayedPosts(posts);
      return;
    }

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(text)
    );
    setDisplayedPosts(filteredPosts);
  };

  const createpost = (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      comments: [],
      title: e.target.title.value,
      post: e.target.post_content.value,
      tag: e.target.tags.value,
    };

    fetch("https://agri-smart-backend.vercel.app/make-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Post Created!");
          setReloadData(true);
        } else {
          toast.error("Error Occurred");
        }
      });

    document.getElementById("createpost").close();
  };

  return (
    <div className="border rounded-2xl min-h-[96vh] p-4">
      <h1 className="text-2xl font-bold">Community Forum</h1>
      <hr className="my-2" />
      {/* CONTROLS */}
      <div className="flex items-center gap-3">
        <form className="max-w-[200px] w-full" onSubmit={handleSearch}>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="All" defaultValue>
              All
            </option>
            <option value="your">Your Posts</option>
          </select>
        </form>
        <form className="max-w-sm flex items-center" onSubmit={handleSearch}>
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className="text-lg"></IoSearchOutline>
            </div>
            <input
              type="text"
              name="searchtext"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Search."
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border border-primary hover:bg-primary"
          >
            <IoSearchOutline className="text-lg"></IoSearchOutline>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <div className="flex justify-end flex-1">
          <button
            onClick={() => document.getElementById("createpost").showModal()}
            className="btn bg-primary hover:bg-primary text-white border-none"
          >
            Create Post +
          </button>
        </div>
      </div>
      <hr className="my-2" />
      {/* POSTS MAPPING */}
      <div>
        {/* POST */}
        {loading ? (
          <>
            <div className="flex items-center justify-center min-h-[30vh]">
              <span className="loading loading-bars loading-xl text-black"></span>
            </div>
          </>
        ) : (
          <div>
            {displayedPost.length > 0 ? (
              <>
                {displayedPost.map((post) => (
                  <Link key={post._id} to={`/community/post/${post._id}`}>
                    <div className="flex items-start gap-5 border p-5">
                      <div className="flex items-center gap-2 mt-1 pr-2">
                        {post.comments.length}{" "}
                        <FaCommentAlt className="text-gray-600"></FaCommentAlt>
                      </div>
                      <div className="flex-1">
                        <h1 className="line-clamp-1 font-bold">{post.title}</h1>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="badge font-bold bg-green-300 text-green-900 border-none">
                            {post.tag}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs pl-2 font-medium text-gray-600 space-y-2 text-right">
                        <div>{post.email.split("@")[0]}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <>
                <h1 className="flex justify-center h-[30vh] items-center text-xl font-bold">
                  No Posts Found!
                </h1>
              </>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      <dialog id="createpost" className={`modal`}>
        <div className="modal-box  overflow-y-scroll">
          <form className="space-y-4" onSubmit={createpost}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Post Title"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Tag
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="tags"
                >
                  <option value="Crop" defaultValue>
                    Crop
                  </option>
                  <option value="Soil">Soil</option>
                  <option value="Pest">Pest</option>
                  <option value="Harvest">Harvest</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Post Content
                </label>
                <textarea
                  type="text"
                  name="post_content"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Post Body"
                  required
                />
              </div>
            </div>

            <button className="btn w-full bg-primary text-white hover:bg-primary">
              Add
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Community;
