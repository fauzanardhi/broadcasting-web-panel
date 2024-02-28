import AuthConfig from "@/lib/auth.config";
import { getServerSession } from "next-auth";

export default async function getUserSession() {
    const session = await getServerSession(AuthConfig)
    return session?.user
}