import fs from "fs";
import path from "path";
import { readFiles, random } from "../utils/createMock";

const root = path.dirname(require.main.filename);
const mocks = 'client/api/mocks';

const createLibraryMock = async (req, res) => {
  // Get Files
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
  ], "library", root)

  // Create mock json
  const mock = JSON.parse(libraryMock).map(library => ({
    ...library,
    ColorTempMock: JSON.parse(random(ColorTempMock)),
    DoughnutChartMock: JSON.parse(random(DoughnutChartMock)),
    HeaderBarChartMock: JSON.parse(random(HeaderBarChartMock)),
    ShotByShotMock: JSON.parse(random(ShotByShotMock))
  }))

  // Create libraryMock.json file
  fs.writeFile(path.join(root, `${mocks}/libraryMock.json`), JSON.stringify(mock), (err) => {
    if (err) console.log(err)
  });

  res.redirect('../')
}

const createMarketviewTimeMock = async (req, res) => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ]

  // Get Files
  let {
    marketviewCompetitorTopVideosMock: CompetitorTopVideos,
    marketviewCompetitorVideos: CompetitorVideos,
    marketviewSimilarProperties: SimilarProperties,
  } = readFiles([
    "marketviewCompetitorTopVideosMock",
    "marketviewCompetitorVideos",
    "marketviewSimilarProperties"
  ], "marketview", root)

  // Create mock json
  const mock = days.reduce((object, days) => {
    object[days] = {
      CompetitorTopVideos: JSON.parse(random(CompetitorTopVideos)),
      CompetitorVideos: JSON.parse(random(CompetitorVideos)),
      SimilarProperties: JSON.parse(random(SimilarProperties)),
    }
    return object;
  }, {});

  // Create marketviewTimeMock.json file
  fs.writeFile(path.join(root, `${mocks}/marketviewTimeMock.json`), JSON.stringify(mock), (err) => {
    if (err) console.log(err)
  });

  res.redirect('../')
}

module.exports = {
  createLibraryMock,
  createMarketviewTimeMock
};
