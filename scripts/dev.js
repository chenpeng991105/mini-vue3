const args = require('minimist')(process.argv.slice(2))
const { resolve } = require('path')
const { build } = require('esbuild')

const target = args._[0] || 'reactivity'
const format = args.f || 'global'

const pkg = require(resolve(__dirname, `../packages/${target}/package.json`))

// iife: 立即执行函数 (function(){})()
// cjs: commonjs模块 module.exports
// esm: 浏览器中的esModule模块 import
const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)

build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    platform: format === 'cjs' ? 'node' : 'browser',
    watch: {
        onRebuild(error) {
            if (!error) {
                console.log('rebuild~~~~~')
            }
        }
    }
}).then(() => {
    console.log('watching~~~~~')
})