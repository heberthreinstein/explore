export interface Roles {
    player: boolean;
    creator?: boolean;
    admin?:  boolean;
}

export class User {
    email: string;
    roles: Roles;

    constructor(authData) {
        this.email    = authData.email;
        this.roles    = { player: true };
    }
}