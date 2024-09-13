export interface AuthResponse {
    data:    Data;
    message: string;
    status:  number;
}

export interface Data {
    token: string;
}

export interface AuthErrors {
    errors: AuthError[];
}

export interface AuthError {
    status: number;
    message: string;
    source: string;
}
