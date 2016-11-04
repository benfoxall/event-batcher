import buble from 'rollup-plugin-buble'

export default {
  entry: 'index.js',
  format: 'umd',
  moduleName: 'eventBatcher',
  dest: 'dist/event-batcher.js',
  plugins: [buble()],
}
