const LIKES_OPTIONS = [
  { value: 'Views', label: 'Views' },
  { value: 'Likes', label: 'Likes' },
  { value: 'Shares', label: 'Shares' },
  { value: 'Comments', label: 'Comments' },
]

const RESOLUTION_OPTIONS = [
  { value: 'resolution', label: 'Resolution' },
  { value: 'aspect-ratio', label: 'Aspect Ratio' },
  { value: 'frame-rate', label: 'Frame Rate' },
  { value: 'duration', label: 'Duration' },
  { value: 'pacing', label: 'Pacing' },
  { value: 'dominant-color', label: 'Dominant Color' },
]

const DURATION_OPTIONS = [
  { value: '0-15', label: '0-15 sec' },
  { value: '16-30', label: '16-30 sec' },
  { value: '31-60', label: '31-60 sec' },
  { value: '61', label: '61+' },
]

const WARM_COLOR_OPTIONS = [
  { value: 'happy-sad', label: 'Happy / Sad' },
  { value: 'energetic-calm', label: 'Energetic / Calm' },
  { value: 'saynthetic-natural', label: 'Saynthetic / Natural' },
]

const PLATFORM_OPTIONS = [
  { value: 'All Platforms', label: 'All Platforms' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
]

const PERCENT_OPTIONS = [
  { value: '360', label: '360' },
  { value: '480', label: '480' },
  { value: '720p', label: '720p' },
  { value: '1080p', label: '1080p' },
]

const VIEW_OPTIONS = [
  { value: 'Card', label: 'Card' },
  { value: 'Table', label: 'Table' },
]

const DATE_OPTIONS = [
  { value: 'Past Week', label: 'Past Week' },
  { value: 'Past Month', label: 'Past Month' },
  { value: 'Past 3 Months', label: 'Past 3 Months' },
]

export {
  LIKES_OPTIONS,
  RESOLUTION_OPTIONS,
  DURATION_OPTIONS,
  WARM_COLOR_OPTIONS,
  PLATFORM_OPTIONS,
  PERCENT_OPTIONS,
  VIEW_OPTIONS,
  DATE_OPTIONS,
}
