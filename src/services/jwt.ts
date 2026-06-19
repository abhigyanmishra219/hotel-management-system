import jwt from 'jsonwebtoken'

export function createToken(data: string) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(data, secret);

    return token;
}

export function verifyToken(token: string) {
    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const data = jwt.verify(token, secret);

        return data;
    } catch {
        return null;
    }
}