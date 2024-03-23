import { useEffect, useState } from "react";
import { MdOutlineForum } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { CiFlag1 } from "react-icons/ci";
const CommunityPost = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [reloadData, setReloadData] = useState(false);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://agri-smart-backend.vercel.app/get-posts-id/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setReloadData(false);
      });
  }, [params, reloadData]);

  const handleChange = (e) => {
    setComment(e.target.value);
    // Resize textarea
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleTextareaKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleComment(e);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment === "") {
      toast.error("Comment field is empty!");
      return;
    }

    const commentBody = {
      email: user.email,
      comment: comment,
    };

    fetch(`https://agri-smart-backend.vercel.app/post-comment/${data._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Comment Submitted Successfully");
          setComment("");
          setReloadData(true);
        } else {
          toast.error("Error has occurred");
        }
      });
  };

  function reverseArray(arr) {
    let reversedArray = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversedArray.push(arr[i]);
    }
    return reversedArray;
  }

  return (
    <div className="border rounded-2xl min-h-[96vh] p-4">
      <h1 className="text-2xl font-bold">Community Forum</h1>
      <hr className="my-2" />
      {loading ? (
        <>
          <div className="flex items-center justify-center min-h-[30vh]">
            <span className="loading loading-bars loading-xl text-black"></span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="badge font-bold bg-green-300 text-green-900">
              {data.tag}
            </span>
          </div>
          <div className="flex gap-2">
            <MdOutlineForum className="text-4xl"></MdOutlineForum>
            <h1 className="font-bold text-xl flex-1">{data.title}</h1>
          </div>
          <hr className="my-2" />
          <p className="text-gray-700 font-medium min-h-[20vh]">{data.post}</p>
          <hr className="my-2" />
          <h1 className="text-xl font-bold">
            Comments{" "}
            <span className="text-lg text-gray-500">
              {data?.comments?.length}
            </span>
          </h1>
          <hr className="my-2" />
          <div className="flex gap-2 flex-row-reverse">
            <form
              onSubmit={handleComment}
              className={`flex-1 border rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-4 text-gray-600 font-medium flex gap-4 relative`}
            >
              <textarea
                type="field"
                className="textarea-auto flex-1 outline-none pr-12 disabled:bg-transparent"
                onChange={handleChange}
                value={comment}
                placeholder="Your Comment Here..."
                onKeyPress={handleTextareaKeyPress}
              />
              <button className="btn border-none bg-primary hover:bg-primary text-white">
                Submit
              </button>
            </form>
            <div className="rounded-full">
              <img src={user?.photoURL} className="w-12 rounded-full" />
            </div>
          </div>
          <hr className="my-2" />
          {data?.comments?.length > 0 ? (
            <>
              {reverseArray(data.comments).map((item, index) => (
                <div key={index} className="border p-4">
                  <h1>
                    {user.email === item.email ? (
                      <div>
                        <span className="text-sm text-gray-500 font-medium">
                          {" "}
                          {item.email}
                        </span>
                        <span className="badge badge-sm border-none bg-secondary text-white ml-2">
                          You
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 font-medium">
                        {" "}
                        {item.email}
                      </span>
                    )}
                  </h1>
                  <p className="text-gray-700 my-3">{item.comment}</p>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default CommunityPost;
