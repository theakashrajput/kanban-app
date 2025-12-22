import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { registerUserApi } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

const Register = () => {

  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  const { register, reset, handleSubmit, formState: { errors, isSubmitting }, } = useForm();

  const handleFormSubmit = async (data) => {
    reset();
    const response = await registerUserApi(data);
    if (response.success) {
      loggedInUser(response.data);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-10 shadow-2xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="text-zinc-400 text-sm font-semibold mt-2">Enter your details to get started</p>
        </header>

        <div className="space-y-6">
          {/* Username Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-medium text-zinc-300">
              Username:
            </label>
            <input
              {...register("userName", { required: "Username is required" })}
              id="username"
              type="text"
              placeholder="johndoe"
              autoComplete="username"
              className={`bg-zinc-800 border ${errors.userName ? "border-red-400" : "border-zinc-700"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-500`}
            />
            {errors.userName && <small className="text-red-400 font-semibold">{errors.userName.message}</small>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
              Email:
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address"
                }
              })}
              id="email"
              type="email"
              placeholder="name@example.com"
              className={`bg-zinc-800 border ${errors.email ? "border-red-400" : "border-zinc-700"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-500`}
            />
            {errors.email && <small className="text-red-400 font-semibold">{errors.email.message}</small>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-zinc-300">
              Password:
            </label>
            <input
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" }, maxLength: { value: 15, message: "Too long!" } })}
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className={`bg-zinc-800 border ${errors.password ? "border-red-400" : "border-zinc-700"} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-zinc-500`}
            />
            {errors.password && <small className="text-red-400 font-semibold">{errors.password.message}</small>}
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? "Creating user..." : "Create User"}
          </button>

          {/* Footer Link */}
          <p className="text-center text-sm text-zinc-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              type="button" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline hover:underline-offset-4">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register