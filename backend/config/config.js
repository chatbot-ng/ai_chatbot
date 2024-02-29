const config = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
    RECAPTCHA_KEY : process.env.RECAPTCHA_KEY,
    SMTP_KEY : process.env.SMTP_KEY,
    FRONTEND_URL : process.env.FRONTEND_URL,
    MONGODB_ATLAS_VECTOR_URI:process.env.MONGODB_ATLAS_VECTOR_URI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
}
export default config;

export const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY
export const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL
export const RECAPTCHA_KEY= process.env.RECAPTCHA_KEY
export const SMTP_KEY= process.env.SMTP_KEY
export const FRONTEND_URL= process.env.FRONTEND_URL
export const MONGODB_ATLAS_VECTOR_URI=process.env.MONGODB_ATLAS_VECTOR_URI
export const OPENAI_API_KEY= process.env.OPENAI_API_KEY