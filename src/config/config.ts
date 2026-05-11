const env = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

const config = {
  nextauthSecret: env("NEXTAUTH_SECRET"),
  defaultPassword: env("DEFAULT_PASSWORD"),
};

export default config;
