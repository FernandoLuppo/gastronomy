const { WEBSITE_URL, WEBSITE_URL_02 } = process.env

const allowedOrigins = [WEBSITE_URL as string, WEBSITE_URL_02 as string]
const corsConfig = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

export { corsConfig }
