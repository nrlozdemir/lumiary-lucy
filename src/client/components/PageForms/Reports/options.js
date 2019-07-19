export const selectOptionsBrand = [
  { value: 'bleacher-report', label: 'Bleacher Report' },
  { value: 'espn', label: 'ESPN' },
  { value: 'scout-media', label: 'Scout Media' },
  { value: 'fanside', label: 'Fanside' },
  { value: 'barstool-sports', label: 'Barstool Sports' },
]

export const selectOptionsSocial = [
  { value: 'all', label: 'All Platforms' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'youTube', label: 'YouTube' },
]

export const selectOptionsPlatformEngagement = [
  {
    label: 'All Platforms',
    options: [
      { value: 'all|views', label: 'Views' },
      { value: 'all|likes', label: 'Likes' },
      { value: 'all|shares', label: 'Shares' },
      { value: 'all|comments', label: 'Comments' },
    ],
  },
  {
    label: 'Facebook',
    options: [
      { value: 'facebook|views', label: 'Views' },
      { value: 'facebook|likes', label: 'Likes' },
      { value: 'facebook|shares', label: 'Shares' },
      { value: 'facebook|comments', label: 'Comments' },
    ],
  },
  {
    label: 'Twitter',
    options: [
      { value: 'twitter|views', label: 'Views' },
      { value: 'twitter|likes', label: 'Likes' },
      { value: 'twitter|shares', label: 'Shares' },
      { value: 'twitter|comments', label: 'Comments' },
    ],
  },
  {
    label: 'Instagram',
    options: [
      { value: 'instagram|views', label: 'Views' },
      { value: 'instagram|likes', label: 'Likes' },
      { value: 'instagram|shares', label: 'Shares' },
      { value: 'instagram|comments', label: 'Comments' },
    ],
  },
  {
    label: 'YouTube',
    options: [
      { value: 'youtube|views', label: 'Views' },
      { value: 'youtube|likes', label: 'Likes' },
      { value: 'youtube|shares', label: 'Shares' },
      { value: 'youtube|comments', label: 'Comments' },
    ],
  },
]

export const selectOptionsEngagement = [
  { value: 'likes', label: 'Likes' },
  { value: 'views', label: 'Views' },
  { value: 'comments', label: 'Comments' },
  { value: 'shares', label: 'Shares' },
]

export const selectOptionsDateRange = [
  { value: 'week', label: 'Past Week' },
  { value: 'month', label: 'Past Month' },
  { value: '3months', label: 'Past 3 Months' },
]
