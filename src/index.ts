import fs from "node:fs";
import path from "node:path";

import { Context, Schema } from "koishi";
// noinspection ES6UnusedImports
import {} from "@koishijs/plugin-console";

const readme = fs.readFileSync(path.join(__dirname, "../readme.md"), "utf8");
export const usage = readme;
export const name = "theme-yeshu";
export const inject = ["console"];

export interface Config {}
export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context, config: Config) {
  let prod = path.resolve(__dirname, "../dist");
  if (prod.includes("external") && !prod.includes("node_modules")) {
    prod = path.join(
      ctx.baseDir,
      `node_modules/koishi-plugin-${name}/dist`,
    );
  }
  ctx.console.addEntry({
    dev: path.resolve(__dirname, "../client/index.ts"),
    prod,
  });
}
