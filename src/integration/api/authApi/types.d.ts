interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export interface ProfileResponse {
  _id: string;
  role: string;
  status: number;
  branch: string;
  fullName: string;
  avatar: string;
  username: string;
  sessions: [
    {
      _id: string;
      userAgent: string;
      ip: string;
      approved: boolean;
      createdAt: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
  balance: number;
  breadPrices: [];
  salaryBalance: number;
  bakerRoom: string;
  message: string | null;
  user: string | null;
}

interface UpdateProfileResponse {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileRequest {
  id: string;

  body: {
    fullName?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    avatar?: string | undefined;
  };
}

interface UploadImageRequest {
  formData: FormData;
}

interface UpdatePasswordResponse {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
