export const API_ROOT = process.env.API_ROOT
export const API_VERSION = process.env.API_VERSION
export const QAPI_ROOT = process.env.QAPI_ROOT
export const QAPI_VERSION = process.env.QAPI_VERSION
export const staticUrl = process.env.STATIC_URL
export const mediaUrl = process.env.MEDIA_URL
export const breakpoints = process.env.BREAKPOINTS
export const baseName = process.env.BASENAME
export const chartColors = [
  '#2FD7C4',
  '#8562F3',
  '#5292E5',
  '#ACB0BE',
  '#545b79',

  // random shit colors idk bro
  '#ff556f',
  '#3edcca',
  '#229a78',
  '#fff20d',
  '#9576f5',
  '#ffacb9',
  '#eb7919',
]

export const compareBrandChartColors = ['#5292E5', '#2FD7C4']

export const CVScoreChartColors = ['#fff', '#ccc', '#eee', '#000']

export const weeks = ['Week1', 'Week2', 'Week3', 'Week4']
export const dayOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const smallDayOfWeek = {
  Sunday: 'S',
  Monday: 'M',
  Tuesday: 'T',
  Wednesday: 'W',
  Thursday: 'T',
  Friday: 'F',
  Saturday: 'S',
}

export const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const expectedNames = {
  color: 'Dominant Color',
  pacing: 'Pacing',
  duration: 'Duration',
  resolution: 'Resolution',
  aspectRatio: 'Aspect Ratio',
  frameRate: 'Frame Rate',
  format: 'Format',
}
export const moduleNames = [
  'SliderModule',
  'BarChartModule',
  'PacingCardModule',
  'RadarChartModule',
  'ReportCardsModule',
  'TopVideosCardModule',
  'VideoComparisonModule',
  'ColorComparisonModule',
  'ColorTemperatureModule',
  'BarAndDoughnutChartModule',
  'ContentVitalityScoreModule',
  'LineAndDoughnutChartModule',
  'TopSimilarPropertiesModule',
  'PerformanceComparisonModule',
  'VideoReleasesBarChartModule',
]
export const dateRangeLabels = {
  week: 'Past Week',
  month: 'Past Month',
  '3months': 'Past 3 Months',
}
export const moduleIds = {
  'Panoptic/Top-Performing-Formats-This-Week-By-CV-Score': '456456456',
}
export const formatToS3Examples = {
  'User Generated (Animation)': null,
  'User Generated (Live Action)': `${mediaUrl}/asset/formats/User+Generated+(Live+Action).mp4`,
  'Professional (Live Action)': `${mediaUrl}/asset/formats/Professional+(Live+Action).mp4`,
  'Professional (Animation)': `${mediaUrl}/asset/formats/Professional+(Animation).mp4`,
  'Professional (Live Action + Animation)': `${mediaUrl}/asset/formats/Professional+(Live+Action+%2B+Animation).mp4`,
  GIF: `${mediaUrl}/asset/formats/GIF.mp4`,
  Cinemagraph: `${mediaUrl}/asset/formats/Cinemagraph.mp4`,
  'Stop Motion': `${mediaUrl}/asset/formats/Stop+Motion.mp4`,
  Photograph: `${mediaUrl}/asset/formats/Photograph.mp4`,
  'Event Coverage': `${mediaUrl}/asset/formats/Event+Coverage.mp4`,
  Interview: `${mediaUrl}/asset/formats/Interview.mp4`,
  Highlight: `${mediaUrl}/asset/formats/Highlight.mp4`,
  Instructional: `${mediaUrl}/asset/formats/Instructional.mp4`,
  Drone: `${mediaUrl}/asset/formats/Drone.mp4`,
  GoPro: `${mediaUrl}/asset/formats/GoPro.mp4`,
  'Top Down': `${mediaUrl}/asset/formats/Top+Down.mp4`,
  'Hands Only': `${mediaUrl}/asset/formats/Hands+Only.mp4`,
  Unboxing: `${mediaUrl}/asset/formats/Unboxing.mp4`,
  '360': null,
  'Tutorial (includes DIY & Recipe)': `${mediaUrl}/asset/formats/Tutorial+(includes+DIY+%26+Recipe).mp4`,
  Explainer: `${mediaUrl}/asset/formats/`,
  Testimonial: `${mediaUrl}/asset/formats/Testimonial.mp4`,
  'Product Explainer': `${mediaUrl}/asset/formats/Product+Explainer.mp4`,
  'Virtual Reality': `${mediaUrl}/asset/formats/Virtual+Reality.mp4`,
  Parallax: `${mediaUrl}/asset/formats/Parallax.mp4`,
}
export const platforms = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  instagram: 'Instagram',
  youtube: 'YouTube',
}
export const formatToSmallText = {
  'User Generated (Animation)': 'UGCA',
  'User Generated (Live Action)': 'UGCLA',
  'Professional (Live Action)': 'PLA',
  'Professional (Animation)': 'PA',
  'Professional (Live Action + Animation)': 'PLA+A',
  'Tutorial (includes DIY & Recipe)': 'DIY',
}
export const propertyBuckets = {
  pacing: ['Slowest', 'Slow', 'Medium', 'Fast'],
  aspectRatio: ['1:1', '4:3', '16:9', '4:5'],
  duration: ['0-15', '16-30', '31-60', '60+'],
  format: [
    'User Generated (Animation)',
    'User Generated (Live Action)',
    'Professional (Live Action)',
    'Professional (Animation)',
    'Professional (Live Action + Animation)',
    'GIF',
    'Cinemagraph',
    'Stop Motion',
    'Plotograph',
    'Event Coverage',
    'Interview',
    'Highlight',
    'Instructional',
    'Drone',
    'GoPro',
    'Top Down',
    'Hands Only',
    'Unboxing',
    '360',
    'Tutorial (includes DIY & Recipe)',
    'Explainer',
    'Testimonial',
    'Product Explainer',
    'Virtual Reality',
    'Parallax',
    'Other',
    'Multiple',
  ],
  frameRate: ['24', '30', '50'],
  resolution: ['4K', '1080p', '720p', '480p', '360p'],
}
