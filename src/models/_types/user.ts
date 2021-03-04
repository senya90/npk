import {RoleName} from "./role";

export type User = {
    login: string | null
    userId: string | null
    role: RoleName | null
}