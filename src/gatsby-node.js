const { resolve, relative } = require(`path`)

const { ensureDir, readdir, copy } = require(`fs-extra`)

const { readFileCount } = require('./utils')

async function calculateDirs(
  store,
  { extraDirsToCache = [], cachePublic = false }
) {
  const program = store.getState().program
  const rootDirectory = program.directory

  const dirsToCache = [
    cachePublic && resolve(rootDirectory, `public`),
    resolve(rootDirectory, `.cache`),
    ...extraDirsToCache.map((dirToCache) => resolve(rootDirectory, dirToCache)),
  ].filter(Boolean)

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
    rootDirectory,
    dirsToCache,
    netlifyCacheDir,
  }
}

function generateCacheDirectoryNames(rootDirectory, netlifyCacheDir, dirPath) {
  const relativePath = relative(rootDirectory, dirPath)
  const dirName = relativePath.replace('/', '--')
  const cachePath = resolve(netlifyCacheDir, dirName)
  const humanName = relativePath
  return { cachePath, humanName }
}

exports.onPreInit = async function (
  { store },
  { extraDirsToCache, cachePublic, verbose = false }
) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const { dirsToCache, netlifyCacheDir, rootDirectory } = await calculateDirs(
    store,
    {
      extraDirsToCache,
      cachePublic,
    }
  )

  for (const dirPath of dirsToCache) {
    const { cachePath, humanName } = generateCacheDirectoryNames(
      rootDirectory,
      netlifyCacheDir,
      dirPath
    )

    await ensureDir(cachePath)

    let dirFileCount
    let cacheFileCount
    if (verbose) {
      dirFileCount = await readFileCount(dirPath)
      cacheFileCount = await readFileCount(cachePath)
    } else {
      const dirFiles = await readdir(dirPath)
      const cacheFiles = await readdir(cachePath)
      dirFileCount = dirFiles.length
      cacheFileCount = cacheFiles.length
    }

    console.log(
      `plugin-netlify-cache: Restoring ${cacheFileCount} cached files for ${humanName} directory with ${dirFileCount} already existing files.`
    )

    await copy(cachePath, dirPath)
  }

  console.log(`plugin-netlify-cache: Netlify cache restored`)
}

exports.onPostBuild = async function (
  { store },
  { extraDirsToCache, cachePublic }
) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const { dirsToCache, netlifyCacheDir, rootDirectory } = await calculateDirs(
    store,
    {
      extraDirsToCache,
      cachePublic,
    }
  )

  for (const dirPath of dirsToCache) {
    const { cachePath, humanName } = generateCacheDirectoryNames(
      rootDirectory,
      netlifyCacheDir,
      dirPath
    )

    console.log(`plugin-netlify-cache: Caching ${humanName}...`)

    await copy(dirPath, cachePath)
  }

  console.log(`plugin-netlify-cache: Netlify cache refilled`)
}
