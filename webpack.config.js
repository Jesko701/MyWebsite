import { fileURLToPath } from "url";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";

export default {
  mode: isProduction ? "production" : "development",
  entry: path.join(__dirname, "src/main.jsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: isProduction ? "[name][contenthash].js" : "[name].js",
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Serve static files from 'public'
    },
    compress: true,
    port: 3030,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              import: false,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: { node: "current" } }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: isProduction
            ? "images/[name][contenthash][ext]"
            : "images/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? "[name][contenthash].css" : "[name].css",
    }),
    new WebpackAssetsManifest({
      output: "asset-manifest.json", // This generates a manifest mapping original to hashed filenames
      writeToDisk: true,
    }),
    // Not necessary used, because public was static assets that must be used by CDN
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "public"),
          to: "",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  optimization: isProduction
    ? {
        splitChunks: {
          chunks: "all",
        },
      }
    : undefined,
};
