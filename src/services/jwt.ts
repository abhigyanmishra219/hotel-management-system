import jwt, { JwtPayload } from "jsonwebtoken";

export function createToken(data: { id: string }) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(data, secret);

    return token;
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        const secret = process.env.JWT_SECRET!;

        const data = jwt.verify(token, secret);

        if (typeof data === "string") {
            return null;
        }

        return data;
    } catch {
        return null;
    }
}