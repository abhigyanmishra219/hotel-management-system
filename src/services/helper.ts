import { cookies } from "next/headers"
import { verifyToken } from "./jwt";
import prismaclient from "./prisma";

export async function getUserFromCookies() {
    try {
        const userCookies = await cookies();
        const token = userCookies.get("token")?.value;

        if (!token) {
            return null;
        }

        const data = verifyToken(token);

        if (!data || typeof data === "string" || !("id" in data)) {
            return null;
        }

        const user = await prismaclient.user.findUnique({
            where: {
                id: data.id,
            },
            omit: {
                password: true,
            },
        });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("error in helper", error);
        return null;
    }
}