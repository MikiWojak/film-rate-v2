type ILoginRequestFields = 'email' | 'password';

interface ILoginRequest {
    email: string;
    password: string;
}

interface ITokenResponse {
    accessToken: string;
}

interface IMeResponse {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type { IMeResponse, ILoginRequest, ITokenResponse, ILoginRequestFields };
