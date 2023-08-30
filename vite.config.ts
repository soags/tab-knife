import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

import packageJson from './package.json'
const { version } = packageJson

const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/)

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Tab Cutter',
  description: 'This extension divides one window into two',
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  icons: {
    '16': 'public/icon-16.png',
    '48': 'public/icon-48.png',
    '128': 'public/icon-128.png',
  },
  action: {
    default_icon: {
      '16': 'public/icon-16.png',
      '48': 'public/icon-48.png',
      '128': 'public/icon-128.png',
    },
    default_title: 'Tab Cutter',
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  permissions: [],
})

export default defineConfig({
  plugins: [crx({ manifest })],
})
