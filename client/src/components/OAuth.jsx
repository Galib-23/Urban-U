import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      //console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');

    } catch (error) {
      console.log("Could not sign in with google \n", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="p-3 bg-red-700 text-white rounded-lg uppercase shadow-sm flex items-center justify-center gap-2 font-semibold hover:opacity-90"
    >
      Continue with google <FaGoogle className="text-white" />
    </button>
  );
};

export default OAuth;
