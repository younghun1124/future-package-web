/** @type {import('postcss-load-config').Config} */
const config = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  plugins: {
    tailwindcss: {},
  },
};

export default config;
