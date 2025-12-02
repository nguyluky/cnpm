import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import env from "../env";

import { HttpScheme, HttpSecurityScheme } from "@lib/BaseAuth";
import {
  ApiError,
  ForbiddenError,
  TokenTimeoutError,
  TokenVerificationError,
} from "@lib/exception";
import { Middleware } from "@lib/httpMethod";

// sử dụng để xác thực JWT
class JWTAuth extends HttpSecurityScheme {
  constructor() {
    super(HttpScheme.BEARER, undefined, "JWT Authentication Scheme");
  }

  // Hàm xác thực token JWT
  async validated(token: string): Promise<RequestWithUser | null> {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      return decoded as RequestWithUser;
    } catch (error) {
      return null;
    }
  }
}

type Premisstion =
  | "update:user"
  | "read:profile"
  | "read:public_profile"
  | "delete:user"
  | "create:bus"
  | "update:bus"
  | "delete:bus"
  | "read:bus"
  | "read:bus_detail"
  | "role:read"
  | "role:create"
  | "role:update"
  | "role:delete"
  | "permission:read"
  | "read:driver_schedule"
  | "read:parent_students"
  | "read:routes"
  | "read:route"
  | "read:route_detail"
  | "create:route"
  | "update:route"
  | "delete:route"
  | "read:schedule"
  | "read:schedule_detail"
  | "create:schedule"
  | "update:schedule"
  | "delete:schedule"
  | "read:stoppoints"
  | "read:stoppoints_detail"
  | "create:stoppoints"
  | "update:stoppoints"
  | "delete:stoppoints"
  | "read:student"
  | "read:student_detail"
  | "create:student"
  | "update:student"
  | "delete:student"
  | "update:driver_trip"
  | "update:driver_location";

const parentPermissions: Premisstion[] = [
  "read:profile",
  "read:public_profile",
  "read:parent_students",
];

const driverPermissions: Premisstion[] = [
  "read:profile",
  "read:public_profile",
  "read:driver_schedule",
  "update:driver_trip",
  "update:driver_location",
];

// kiểm tra quyền hạng
export const usePremisstion = (requiredPermissions: Premisstion[]) => {
  return Middleware.bind(null, async (req, metaData) => {
    // @ts-ignore
    const user = req.user as RequestWithUser["user"];

    const userPermissions = user.permissions || [];

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenError(
        "You do not have permission(" + requiredPermissions.join(", ") + ") to access this resource."
      );
    }
  })();
};

// type where authentication succeeds and this type is in response

export const JWT_AUTH = new JWTAuth();

export const generateTempToken = (userid: string) => {
  const token = jwt.sign({ userid }, env.TWO_FACTOR_SECRET, {
    expiresIn: env.TWO_FACTOR_EXPIRATION as StringValue,
  });
  return token;
};

export const verifyTempToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as { userid: string };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenTimeoutError();
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new TokenVerificationError();
    } else {
      throw new ApiError(
        "An unexpected error occurred during token verification.",
        500
      );
    }
  }
};

type UserWithoutSensitiveData = {
  id: string;
  email: string;
  roles: string[];
  username: string;
  permissions: string[];
};

export const generateAccessToken = (user: UserWithoutSensitiveData) => {
  const { ...userWithoutSensitiveData } = user;
  const token = jwt.sign({ user: userWithoutSensitiveData }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRATION as StringValue,
  });
  return token;
};

export type RequestWithUser = { user: UserWithoutSensitiveData };
export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as RequestWithUser;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenTimeoutError();
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new TokenVerificationError();
    } else {
      throw new ApiError(
        "An unexpected error occurred during token verification.",
        500
      );
    }
  }
};

export const generateRefreshToken = (userid: string) => {
  const token = jwt.sign({ userid }, env.JWT_SECRET + "refresh", {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION as StringValue,
  });
  return token;
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET + "refresh");
    return decoded as { userid: string };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenTimeoutError();
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new TokenVerificationError();
    } else {
      throw new ApiError(
        "An unexpected error occurred during token verification.",
        500
      );
    }
  }
};

export const generateEmailToken = (userid: string) => {
  const token = jwt.sign({ userid }, env.EMAIL_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const verifyEmailToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.EMAIL_SECRET);
    return decoded as { userid: string };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenTimeoutError();
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new TokenVerificationError();
    } else {
      throw new ApiError("hummmmm", 500);
    }
  }
};
