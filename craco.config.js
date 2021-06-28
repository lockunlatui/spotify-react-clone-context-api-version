const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@containers": path.resolve(__dirname, "./src/containers/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@mocks": path.resolve(__dirname, "./src/mocks/"),
      "@store": path.resolve(__dirname, "./src/store/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@constants": path.resolve(__dirname, "./src/constants/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@api": path.resolve(__dirname, "./api/"),
    },
  },
};
