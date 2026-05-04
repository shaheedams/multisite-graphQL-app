export const getEnvValue = (name: string, fallback: string): string => {
    return process.env[name] ?? fallback;
}

export const config = {
    port: getEnvValue('PORT', '7700'),
    mongoURL: getEnvValue('MONGO_URL', 'mongodb://localhost:27017/multisite'),
    clientURL: getEnvValue('CLIENT_URL', 'http://localhost:3000'),
    nodeENV: getEnvValue('NODE_ENV', 'development'),
}