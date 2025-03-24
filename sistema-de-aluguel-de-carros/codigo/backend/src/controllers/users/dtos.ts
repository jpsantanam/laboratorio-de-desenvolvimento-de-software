export type PostUserDTO = {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'operator';
}

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'operator';
}

export type UserResponseDTO = {
    id: number;
    createdAt: Date;
    name: string;
    email: string;
    role: 'admin' | 'operator';
}

export type GetUsersParamsDTO = {
    search?: string;
    startDate?: string; // Date format
    endDate?: string; // Date format
    role?: 'admin' | 'operator';
}

export type UserLoginDTO = {
    email: string;
    password: string;
}