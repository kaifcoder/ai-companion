import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const {src , name , description , seed, instructions, categoryId} = body;
        if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized",{ status: 401 });

        }
        if(!src || !name || !description || !seed || !instructions || !categoryId){
            return new NextResponse("Bad Request Missing fields",{ status: 400 });
        }

        const isPro = await checkSubscription();

        if(!isPro){
            return new NextResponse("Pro Subscription Required",{ status: 403 });
        }

        const companion = await prismadb.companion.create({
            data: {
                userId: user.id,
                userName: user.firstName,
                categoryId,
                description,
                instructions: instructions,
                name,
                seed,
                src,
            }
        });

        return new NextResponse(JSON.stringify(companion),{ status: 200 });

    } catch (error) {
        console.log("[COMPANION POST]",error);
        return new NextResponse("Internal Error",{ status: 500 })
    }
}
