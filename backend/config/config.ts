export const config = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
    RECAPTCHA_KEY : process.env.RECAPTCHA_KEY,
    SMTP_KEY : process.env.SMTP_KEY,
    FRONTEND_URL : process.env.FRONTEND_URL,
}

export default config;