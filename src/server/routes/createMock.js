const fs = require('fs');
const _ = require('lodash');

const path = require('path');
const root = path.dirname(require.main.filename);
const mocks = 'client/api/mocks';

const readFiles = filenames => {
  return filenames.reduce((object, filename) => {
    object[filename] = fs.readFileSync(path.join(root, `${mocks}/${filename}.json`), 'utf8');
    return object;
  }, {});
}

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNumberArray = (lenght, min, max) => {
  return [...Array(lenght)].map(() => randomNumber(min, max));
}

const randomPercentage = (lenght) => {
  const numbers = randomNumberArray(lenght, 0, 100);
  const total = numbers.reduce((total, value) => total + value)

  return numbers.map(value => Number(((value / total) * 100).toFixed(2)));
}

const random = file => {
  let data = file;

  data = data.replace(/"rN#(.*),(.*)#"/g, ($0, $1, $2) => {
    return randomNumber(parseInt($1), parseInt($2));
  })

  data = data.replace(/"rNA#(.*),(.*),(.*)#"/g, ($0, $1, $2, $3) => {
    return JSON.stringify(randomNumberArray(parseInt($1), parseInt($2), parseInt($3)));
  })

  data = data.replace(/"rP#(.*)#"/g, ($0, $1) => {
    return JSON.stringify(randomPercentage(parseInt($1)));
  })

  data = data.replace(/image=(.*)"/g, ($0, $1) => {
    return 'image=' + randomNumber(1, 100) + '"';
  })

  return data;
}

const createMock = async (req, res) => {
  let {
    libraryMock,
    libraryDetailColorTempMock: ColorTempMock,
    libraryDetailDoughnutChartMock: DoughnutChartMock,
    libraryDetailHeaderBarChartMock: HeaderBarChartMock,
    libraryDetailShotByShotMock: ShotByShotMock,
  } = readFiles([
    "libraryMock",
    "libraryDetailColorTempMock",
    "libraryDetailDoughnutChartMock",
    "libraryDetailHeaderBarChartMock",
    "libraryDetailShotByShotMock",
  ])

  const mock = JSON.parse(libraryMock).map(library => ({
    ...library,
    ColorTempMock: JSON.parse(random(ColorTempMock)),
    DoughnutChartMock: JSON.parse(random(DoughnutChartMock)),
    HeaderBarChartMock: JSON.parse(random(HeaderBarChartMock)),
    ShotByShotMock: JSON.parse(random(ShotByShotMock))
  }))

  fs.writeFile(path.join(root, `${mocks}/mock.json`), JSON.stringify(mock), (err) => {
    if (err) console.log(err)
  });

  res.redirect('../')
}

module.exports = createMock;
