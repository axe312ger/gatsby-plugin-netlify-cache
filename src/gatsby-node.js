const { resolve, basename } = require(`path`)

const { ensureDir, readdir, copy } = require(`fs-extra`)

async function calculateDirs(store, extraDirsToCache = []) {
  const program = store.getState().program

  const dirsToCache = [
    resolve(program.directory, `public`),
    resolve(program.directory, `.cache`),
    ...extraDirsToCache.map(dirToCache =>
      resolve(program.directory, dirToCache)
    )
  ]

  for (const dir of dirsToCache) {
    await ensureDir(dir)
  }

  const netlifyCacheDir = resolve(
    process.env.NETLIFY_BUILD_BASE,
    `cache`,
    `gatsby`
  )

  await ensureDir(netlifyCacheDir)

  return {
    dirsToCache,
    netlifyCacheDir
  }
}

exports.onPreInit = async function({ store }, { extraDirsToCache }) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const { dirsToCache, netlifyCacheDir } = await calculateDirs(
    store,
    extraDirsToCache
  )

  for (const dirPath of dirsToCache) {
    const dirName = basename(dirPath)
    const cachePath = resolve(netlifyCacheDir, dirName)

    await ensureDir(cachePath)

    const dirFiles = await readdir(dirPath)
    const cacheFiles = await readdir(cachePath)

    console.log(
      `Found ${cacheFiles.length} cached files for ${dirName} directory with ${
        dirFiles.length
      } files.`
    )

    await copy(cachePath, dirPath)
  }

  console.log(`plugin-netlify-cache: Netlify cache restored`)
}

exports.onPostBuild = async function({ store }, { extraDirsToCache }) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const { dirsToCache, netlifyCacheDir } = await calculateDirs(
    store,
    extraDirsToCache
  )

  for (const dirPath of dirsToCache) {
    const dirName = basename(dirPath)
    const cachePath = resolve(netlifyCacheDir, dirName)

    const dirFiles = await readdir(dirPath)
    const cacheFiles = await readdir(cachePath)

    console.log(
      `Found ${dirFiles.length} files in ${dirName} directory with ${
        cacheFiles.length
      } already cached files.`
    )

    await copy(dirPath, cachePath)
  }

  console.log(`plugin-netlify-cache: Netlify cache refilled`)
}
