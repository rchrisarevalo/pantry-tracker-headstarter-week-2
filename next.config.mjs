/** @type {import('next').NextConfig} */
import { config } from 'dotenv';
config();

const nextConfig = {
    reactStrictMode: true,
    env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        AI_PROMPT: process.env.AI_PROMPT,
        G_TAG: process.env.G_TAG
    }
};

export default nextConfig;
