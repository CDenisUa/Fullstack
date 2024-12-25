import { Session } from "next-auth";

export interface CustomSession extends Session {
    user: {
        id: string;
        name?: string | undefined;
        email?: string | undefined;
        image?: string | undefined;
    }
}
