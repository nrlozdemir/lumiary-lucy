import fs from 'fs'
import path from 'path'
import { randomKey } from 'Utils'

const root = path.dirname(require.main.filename)
const mocks = 'client/api/mocks'

const createReport = async (req, res) => {
  const { brand, social, engagement, date, title } = req.body
  const reports = JSON.parse(
    fs.readFileSync(path.join(root, `${mocks}/reports.json`), 'utf8')
  )

  const report = {
    id: `${randomKey(4)}-${randomKey(4)}-${randomKey(4)}-${randomKey(4)}`,
    brands: [brand],
    social,
    engagement,
    date,
    title,
    category: 'Brands Insights',
  }

  const mock = {
    ...reports,
    reports: [
      ...reports.reports,
      {
        ...report,
      },
    ],
  }

  fs.writeFile(
    path.join(root, `${mocks}/reports.json`),
    JSON.stringify(mock),
    (err) => {
      if (err) console.log(err)
    }
  )

  setTimeout(() => {
    res.json(report)
  }, 10000)
}

module.exports = { createReport }
