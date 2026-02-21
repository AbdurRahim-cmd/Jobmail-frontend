import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    try {
        const { senderEmail, senderPassword, companies } = await req.json();

        // Step 1: validation
        if (
            !senderEmail ||
            !senderPassword ||
            !Array.isArray(companies) ||
            companies.length === 0
        ) {
            return NextResponse.json({
                message: "All fields are required",
            }, { status: 400 });
        }

        // Step 2: login as candidate
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: senderEmail, // FROM (candidate)
                pass: senderPassword, // App password
            },
        });

        for (const company of companies) {
            const { email, message, subject } = company;

            if (!email || !message || !subject) continue;

            const mailOptions = {
                from: senderEmail,
                to: email,
                subject,
                text: message,
            };

            await transporter.sendMail(mailOptions);
            await sleep(2000);
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
        }, { status: 500 });
    }
}
