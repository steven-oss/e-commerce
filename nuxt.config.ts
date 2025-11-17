// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  nodemailer: {
    from: '"E-Commerce app" <noreply@app.com>',
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_TRAP_USER,
      pass: process.env.EMAIL_TRAP_PASSWORD,
    },
  },

  runtimeConfig: {
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
    JWT_REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    public: {},
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@prisma/nuxt",
    "nuxt-nodemailer",
  ],
});
