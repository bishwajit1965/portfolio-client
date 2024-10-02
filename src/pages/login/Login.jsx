import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogIn from "../../components/shared/socialLogin/SocialLogin";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import { Helmet } from "react-helmet-async";

const MySwal = withReactContent(Swal);

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        MySwal.fire({
          position: "top-end",
          icon: "success",
          title: "You are successfully logged in !",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleValidateCaptcha = (event) => {
    event.preventDefault();
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
      alert("Captcha Matched.");
    } else if (user_captcha_value.trim() === "") {
      alert("Fill up captcha.");
      setDisabled(true);
    } else {
      alert("Captcha Does Not Match.");
      setDisabled(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>Web-tech-services || Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 dark:bg-slate-900">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered h-8"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered h-8"
                />
                <label className="label">
                  <div className="label-text-alt link link-hover grid space-y-2">
                    <Link className="text-indigo-500 text-xs">
                      Forgot password ?{" "}
                      <span className="text-amber-500">
                        Reset your password
                      </span>
                    </Link>
                    <Link className="text-indigo-500 text-xs" to="/sign-up">
                      Not a member yet ?{" "}
                      <span className="text-amber-500">Please Register</span>
                    </Link>{" "}
                  </div>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  ref={captchaRef}
                  className="input input-bordered  h-8"
                  placeholder="Type the captcha above..."
                />
                <button
                  onClick={handleValidateCaptcha}
                  className="btn btn-outline btn-xs mt-4"
                >
                  Validate
                </button>
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={disabled}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login{" "}
                </button>
              </div>
            </form>
            <SocialLogIn />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
