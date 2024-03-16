import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "sonner";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Successfully logged in. Redirecting...");
        e.target.reset();
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <div data-aos="flip-left" className="container mx-auto px-4 py-20">
        <div className="max-w-lg mx-auto">
          <div className="border-[1px] border-black p-8 bg-whit">
            <form onSubmit={handleLogin} className="text-black">
              <h1 className="text-center font-bold text-4xl text-black">
                Login
              </h1>
              <hr className="my-5" />
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-black">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50  border border-gray-300  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="Your email"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-black ">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50  border border-gray-300  text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  required
                  placeholder="Your password"
                ></input>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn border-none bg-primary hover:bg-primary text-white hover:bg-primaryLight font-medium"
                >
                  Login
                </button>
              </div>
              <p className="text-center my-5">
                {`Don't have an account? `}
                <Link className="link" to="/register">
                  Sign Up Here
                </Link>
              </p>
            </form>
            <hr className="my-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
