import { Role } from '@/enums/auth';

type ILoginRequestFields = 'email' | 'password';

type IRegisterRequestFields =
    | ILoginRequestFields
    | 'username'
    | 'confirmPassword';

interface ILoginRequest {
    email: string;
    password: string;
}

interface IRegisterRequest extends ILoginRequest {
    username: string;
    confirmPassword: string;
}

interface ITokenResponse {
    accessToken: string;
}

interface IDecodedToken {
    exp: number;
    iat: number;
    sub: string;
    roles: Role[];
}

interface IProfileResponse {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface IProfileLoaderData {
    profile: Promise<IProfileResponse>;
}

export type {
    Role,
    IDecodedToken,
    ILoginRequest,
    ITokenResponse,
    IProfileResponse,
    IRegisterRequest,
    IProfileLoaderData,
    ILoginRequestFields,
    IRegisterRequestFields
};
