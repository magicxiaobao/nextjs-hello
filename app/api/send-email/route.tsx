import {Resend} from 'resend'
import WelcomeTemplate from "@/emails/WelcomeTemplate";
import {NextResponse} from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    await resend.emails.send({
        from: ' [email protected]',
        to: ' [email protected]',
        subject: 'Hello',
        text: 'Hello from Resend',
        react: <WelcomeTemplate name='welcome'></WelcomeTemplate>
    })
    return NextResponse.json({})
}
