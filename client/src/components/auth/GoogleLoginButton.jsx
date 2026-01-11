import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  return (
    <button
      type="button"
      className="w-full bg-gray-800 hover:bg-gray-700 transition text-white py-3 rounded-lg flex items-center justify-center gap-3"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
}
