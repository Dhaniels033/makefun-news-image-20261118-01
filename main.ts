// "The World Today" — make.fun news-image-20261118 entry.
//
// What this program does: it copies the finished front-page image
// (entry.png, rendered in this repo from frontpage.html) into the
// grader's output directory as entry.png.
//
// The image itself is the entry: a newspaper front page summing up
// Wednesday 18 November 2026 — Trump meeting Marcos in Manila and
// flying to Shenzhen as APEC opens, the Crimea bridge's road arch
// collapsing, fresh Iranian drone attacks intercepted over Bahrain
// and Kuwait, the Dow's 850-point fall and Nvidia's $115.8bn quarter,
// Anthropic pricing its IPO, and Cyclone Akvan strengthening over
// the Bay of Bengal.
//
// Determinism: a file copy is byte-for-byte deterministic, so two
// runs always write identical output. Node standard library only;
// no network, no randomness, no timestamps in the output.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The image lives next to this script in the repo.
const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, "entry.png");

// The grader sets MAKEFUN_OUTPUT_DIR; outside the grader it
// defaults to /output, per the competition rules.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destination = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

const bytes = statSync(destination).size;
console.log(`Wrote ${destination} (${bytes} bytes)`);
