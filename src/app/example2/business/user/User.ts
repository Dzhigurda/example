export type GenderType = "MAN" | "WOMAN";
export type RoleType = "Guest" | "Manager" | "Admin";


export interface UserFormDTO {
    id: number;
    name: string;
    gender: GenderType
}
export interface UserRoleFormDTO {
    id: number;
    role: RoleType;
}
export interface UserAvatarFormDTO {
    id: number;
    avatar?: string;
}
export interface UserDTO extends UserFormDTO, UserRoleFormDTO {
    id: number;
    name: string;
    gender: GenderType
    role: RoleType;
    avatar?: string;
}


export class User {
    public id: number = 0;
    public role: RoleType = "Guest";
    public name: string = "Default name";
    public gender: GenderType = "MAN";

    public avatar?: string;
    private oldState?: User;




    changeDescription(user: UserFormDTO) {
        this.name = user.name;
        this.gender = user.gender;
        return this;
    }


    setAvatar(url: string) {
        this.avatar = url;
        return this;
    }
    clearAvatar() {
        this.avatar = undefined;
        return this;
    }

    changeRole(user: UserRoleFormDTO) {
        this.role = user.role;
        return this;
    }

    public patch(user: UserDTO) {
        this.id = user.id ?? this.id;
        this.name = user.name ?? this.name;
        this.gender = user.gender ?? this.gender;
        this.role = user.role ?? this.role;
        this.avatar = user.avatar ?? this.avatar;
        return this;
    }

    getModelForRole(): UserRoleFormDTO {
        return {
            id: this.id,
            role: this.role
        }
    }
    getModelForEdit(): UserFormDTO {
        return {
            id: this.id,
            name: this.name,
            gender: this.gender,
        }
    }
    restore(user: UserDTO) {
        this.id = user.id;
        this.name = user.name;
        this.role = user.role;
        this.gender = user.gender;
        this.avatar = user?.avatar;
        return this;
    }
    toJSON(): UserDTO {
        return {
            id: this.id,
            role: this.role,
            name: this.name,
            gender: this.gender,
            avatar: this.avatar,
        }
    }
}