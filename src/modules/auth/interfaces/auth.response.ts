export interface AuthResponse {
    data:    Data;
    message: string;
    status:  number;
}

export interface Data {
    token: string;
}
