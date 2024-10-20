import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
import { connecttoDb } from "@utils/database";
import User from "@models/user";
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async session({session}){
            const sessionUser =await User.findOne({
                email:session.user.email,
            });
            session.user.id = sessionUser._id.toString();   
            return session; 
        },
        async signIn({profile}){
            try {   
                await connecttoDb();
                console.log("Connected");
    
                //checks the user 
                const user = await User.findOne({email:profile.email});
                
                if(!user){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture,
                    });
                    return true;
                }
            } catch (error) {
                alert("Not allowed to Sign in")
                console.error(error);
            }
        }
    }
    

})

export {handler as GET , handler as POST};