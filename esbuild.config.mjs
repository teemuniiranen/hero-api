import * as esbuild from 'esbuild'
import { bestzip } from 'bestzip';

const outDir = 'out/appsync';

try {
  await esbuild.build({
    entryPoints: ['src/appsync/authorizer/**/*.ts'],
    outdir: outDir,
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'es2020',
  });

  await esbuild.build({
    entryPoints: ['src/appsync/resolvers/**/*.ts'],
    outdir: outDir,
    bundle: true,
    minify: false,
    platform: 'node',
    sourcemap: 'inline',
    sourcesContent: false,
    target: 'esnext',
    format: 'esm',
    external: ['@aws-appsync/utils']
  });

  bestzip({
      cwd: outDir,
      source: "authorizer.js",
      destination: "authorizer.zip",
  });
} catch (error) {
  console.error(error);
}
