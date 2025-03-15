import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Đảm bảo có biến này trong .env.local
};
