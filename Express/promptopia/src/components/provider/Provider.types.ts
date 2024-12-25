// Types
import {ReactNode} from "react";
import {Session} from "next-auth";

export interface ProviderPropTypes {
    children: ReactNode,
    session: Session | null
}