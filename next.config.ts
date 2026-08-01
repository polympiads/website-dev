import { execSync } from "child_process";
import type { NextConfig } from "next";

type Repository = {
  owner: string;
  name:  string;
};

function getRepoInformation(): Repository | null {
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, name] = process.env.GITHUB_REPOSITORY.split("/");
    return {owner, name};
  }

  try {
    const remoteUrl = execSync("git remote get-url origin", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();

    const match = remoteUrl.match(/github\.com[/:]([^/]+)\/([^/]+?)(\.git)?$/);
    if (match) {
      return { owner: match[1], name: match[2] };
    }
  } catch {
    // no git repo / no origin remote
  }

  return null;
}

function getBasepath (): string {
  const repoInformation = getRepoInformation();
  if (repoInformation === null) {
    return "";
  }

  const {owner, name} = repoInformation;
  // Polympiads convention
  //   ends in website => on a custom domain name
  // Github convention
  //   ends in .github.io => on the root domain name
  if (name.endsWith(".github.io") || name.endsWith("website")) {
    return "";
  }

  return "/" + name;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: getBasepath(),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
