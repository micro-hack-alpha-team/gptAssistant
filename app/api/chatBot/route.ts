import { NextRequest,NextResponse } from "next/server";
import QuestionAnswer from "@/lib/models"
export async function GET (req:NextRequest){
    try {
        const faq = await QuestionAnswer.find()
        return NextResponse.json({pAQ:faq})
    } catch (error) {
        return NextResponse.json({
            error:true
        })
    }
}