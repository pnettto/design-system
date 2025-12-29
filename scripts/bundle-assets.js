import esbuild from "esbuild";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const outDir = path.join(rootDir, "dist");

async function bundle() {
    const isWatch = process.argv[2] === "watch";

    try {
        console.log("📦 Bundling Design System...");

        const buildOptions = (entry, outfile) => ({
            entryPoints: [entry],
            outfile,
            bundle: true,
            minify: !isWatch,
            sourcemap: isWatch,
            logLevel: "info",
            format: "esm", // Use 'export' syntax
        });

        if (isWatch) {
            // Use esbuild's watch mode
            const ctxCSS = await esbuild.context({
                ...buildOptions(
                    path.join(srcDir, "css", "index.css"),
                    path.join(outDir, "css", "bundle.min.css"),
                ),
                loader: { ".css": "css" },
            });

            const ctxJS = await esbuild.context(
                buildOptions(
                    path.join(srcDir, "js", "index.js"),
                    path.join(outDir, "js", "bundle.min.js"),
                ),
            );

            await ctxCSS.watch();
            await ctxJS.watch();

            console.log("👀 Watching for changes...");

            fs.watch(srcDir, { recursive: true }, (_, filename) => {
                if (filename && path.extname(filename) === ".html") {
                    try {
                        fs.cpSync(
                            path.join(srcDir, filename),
                            path.join(outDir, filename),
                        );
                        console.log(`✅ ${filename} updated`);
                    } catch (err) {
                        // Handle cases where the file might be temporarily locked during write
                        if (err.code !== "ENOENT") console.error(err);
                    }
                }
            });

            return; // Keep process alive
        }

        // Regular build...
        await esbuild.build({
            ...buildOptions(
                path.join(srcDir, "css", "index.css"),
                path.join(outDir, "css", "bundle.min.css"),
            ),
            loader: { ".css": "css" },
        });

        await esbuild.build(
            buildOptions(
                path.join(srcDir, "js", "index.js"),
                path.join(outDir, "js", "bundle.min.js"),
            ),
        );

        fs.cpSync(srcDir, outDir, {
            recursive: true,
            filter: (src) => {
                // Allow the root directory to be processed
                if (src === srcDir) return true;

                return src.endsWith(".html") ||
                    src.includes(path.join(srcDir, "images")) ||
                    src.includes(path.join(srcDir, "media"));
            },
        });

        console.log("✅ Design System bundled successfully!");
    } catch (error) {
        console.error("❌ Bundling failed:", error);
        process.exit(1);
    }
}

bundle();
