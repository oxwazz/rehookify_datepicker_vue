import { defineConfig } from 'taze'

export default defineConfig({
  // ignore packages from bumping
  exclude: [],
  // fetch latest package info from registry without cache
  force: true,
})
