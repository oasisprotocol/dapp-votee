#!/usr/bin/env node

// @ts-check
// https://github.com/oasisprotocol/oasis-core/blob/50d972df71fed2bcaa88e6ce5430d919ec08087d/common.mk#L171-L180
import { execSync } from 'child_process'

const GIT_ORIGIN_REMOTE = 'origin'
const RELEASE_BRANCH = 'master'
const BRANCH = `${GIT_ORIGIN_REMOTE}/${RELEASE_BRANCH}`
const COMMIT_SHA = execSync(`git rev-parse ${BRANCH}`).toString().trim()

console.log(`*** Running gitlint for commits from ${BRANCH} (${COMMIT_SHA})`)

try {
  execSync(`gitlint --commits ${BRANCH}..HEAD`, { stdio: 'inherit' })
} catch (error) {
  // We want to keep env browser in eslint config
  // eslint-disable-next-line no-undef
  process.exit(1)
}
