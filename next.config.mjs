/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

import withMDX from "@next/mdx";

export default withMDX()(nextConfig);