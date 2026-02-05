import type { Config } from "release-it";

export default {
  git: {
    commitMessage: "chore: release v${version}",
    tagName: "v${version}",
    pushRepo: "origin",
  },
  npm: {
    publish: true,
  },
  hooks: {
    "before:init": "pnpm updateVersion ${version}",
    "after:npm:release": "pnpm scripts/publish-cargo.cjs",
  },
} satisfies Config;
