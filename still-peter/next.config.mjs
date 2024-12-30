const isProduction = process.env.NODE_ENV === "production";

export default {
  output: "export", // Enables static export
  basePath: isProduction ? "/PersonalSite" : "", // Use base path only in production
  assetPrefix: isProduction ? "/PersonalSite/" : "", // Use asset prefix only in production
};
