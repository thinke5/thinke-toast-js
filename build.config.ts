import { defineBuildConfig } from 'unbuild';
import { transform } from 'esbuild';

export default defineBuildConfig({
  failOnWarn: false,
  entries: ['src/index'],
  // outDir: 'libs',
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: [],
  hooks: {
    'rollup:options'(_, options) {
      if (Array.isArray(options.plugins)) {
        options.plugins.push(inlinePlugin());
      }
    },
  },
});

function inlinePlugin() {
  return {
    name: 'inline',
    async transform(code: string, id: string) {
      if (/\.(svg)$/.test(id)) {
        return {
          code: `export default \`${code}\``,
          map: null,
        };
      }
      if (/\.(css)$/.test(id)) {
        const csscode = /"(.+)"/.exec(code);
        if (csscode) {
          const css = csscode[1].replace(/(\\n)/g, '');
          const { code: minCode } = await transform(css, { loader: 'css', minify: true });

          return {
            code: `export default \`${minCode.replace('\n', '')};\``,
            map: null,
          };
        }
      }
    },
  };
}
