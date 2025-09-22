export declare class AuthResponseDto {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: {
        uuid: string;
        name: string;
        email: string;
    };
}
