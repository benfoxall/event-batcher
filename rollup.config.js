import buble from 'rollup-plugin-buble'

export default {
  entry: 'index.js',
  format: 'iife',
  moduleName: 'eventBatcher',
  dest: 'dist/event-batcher.js',
  plugins: [buble()],
}
