import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const clientId = process.env.GITHUB_ID ?? "";
const clientSecret = process.env.GITHUB_SECRET ?? "";

console.log("GITHUB_ID:", clientId); // Kiểm tra giá trị trong terminal

if (!clientId || !clientSecret) {
    throw new Error("Missing GitHub OAuth credentials");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHubProvider({
            clientid: clientId,
            clientSecret: clientSecret,
        })
    ],
})