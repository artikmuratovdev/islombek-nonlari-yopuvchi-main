import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormData } from "./types";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation, useProfileQuery } from "@/integration";
import { useHandleRequest } from "@/hooks";
import toast from "react-hot-toast";
import { useStorage } from "@/utils";

interface LoginResponse {
  token: string;
  refreshToken: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const handleRequest = useHandleRequest();
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);

  const { data: profileData, isLoading: profileLoading } = useProfileQuery(
    {},
    { skip: !shouldFetchProfile },
  );

  // Profile data kelgandan keyin role ni tekshirish
  useEffect(() => {
    if (profileData && shouldFetchProfile) {
      if (profileData.role === "BAKER_TABLET") {
        toast.success("Tizimga muvaffaqiyatli kirdingiz!");
        setShouldFetchProfile(false);
        setTimeout(() => {
          navigate("/", { replace: true });
          window.location.reload();
        }, 500);
      } else {
        useStorage.removeCredentials();
        toast.error("Bu tizimda sizga ruxsat yo'q");
        setShouldFetchProfile(false);
      }
    }
  }, [profileData, shouldFetchProfile, navigate]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await handleRequest({
      request: async () => {
        return await login(data).unwrap();
      },
      onSuccess: (response: LoginResponse) => {
        // Tokenni saqlash
        useStorage.setCredentials({
          accessToken: response?.token,
          refreshToken: response?.refreshToken,
        });
        // Profile so'rovini yoqish
        setShouldFetchProfile(true);
      },
      onError: (error: { data?: { message?: string } }) => {
        toast.error(error?.data?.message || "Login muvaffaqiyatsiz");
        reset();
      },
    });
  };

  return (
    <div className="text-center px-4 pt-8">
      <h1 className="text-center text-white text-3xl font-bold  leading-[44.61px] tracking-wide">
        Novvoyxona <br /> (yopuvchi)
      </h1>
      <img
        src="/logo 1.png"
        alt="logo"
        className="mx-auto w-1/2 pt-2.5"
        loading="lazy"
      />
      <p className="text-white text-2xl font-bold mt-5">Tizimga kirish</p>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-5 space-y-5">
        <Controller
          name="username"
          control={control}
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                type="username"
                placeholder="Username..."
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-red-500 text-left text-sm">
                  {String(errors.username.message)}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                className={errors.password ? "border-red-500" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-left text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading || profileLoading}
          className="w-full py-3 text-xl text-[#1C2C57] font-bold bg-yellow-400"
        >
          {isLoading || profileLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
