/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  experimental: {
    // Explicitly enable MDX loader for Turbopack
    mdxRs: true,
    turbo: {
      loaders: {
        ".mdx": "mdx-rs-loader",
      },
    },
  },
};

import withMDX from "@next/mdx";

export default withMDX()(nextConfig);