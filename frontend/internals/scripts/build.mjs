#!/usr/bin/env node

// @ts-check

import { execSync } from 'child_process'

const buildSha = execSync('git rev-parse HEAD').toString().trim()
const buildDatetime = Date.now().toString()

execSync(`REACT_APP_BUILD_SHA="${buildSha}" REACT_APP_BUILD_DATETIME="${buildDatetime}" vite build`, {
  stdio: 'inherit',
})
