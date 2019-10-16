const fs = require(`fs-extra`)
const path = require(`path`)

async function readFileCount(targetPath) {
  const files = await fs.readdir(targetPath)
  const countP = files.map(async (file) => {
    const filePath = path.join(targetPath, file)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      const count = await readFileCount(filePath)
      return count
    } 
    if (stats.isFile()) {
      return 1
    }
    return 0
  })

  const results = await Promise.all(countP)
  const total = results.reduce((cur, acc) => acc + cur, 0)
  return total
}

exports.readFileCount = readFileCount
