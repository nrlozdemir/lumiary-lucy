export const selectOptions = {
  orderByOptions: [
    { value: 'filterMostViewed', label: 'Most Viewed Videos' },
    { value: 'filterMostLiked', label: 'Most Liked Videos' },
    { value: 'filterMostShared', label: 'Most Shared Videos' },
    { value: 'filterMostCommented', label: 'Most Commented Videos' },
  ],
  audienceGender: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
  audienceAge: [
    { value: '10-', label: '10 and under' },
    { value: '11-17', label: '11-17 yrs' },
    { value: '18-20', label: '18-20 yrs' },
    { value: '21-24', label: '21-24 yrs' },
    { value: '25-34', label: '25-34 yrs' },
    { value: '35-64', label: '35-64 yrs' },
    { value: '65+', label: '65 and over' },
  ],
  videoFormat: [
    { value: 'live action', label: 'Live Action' },
    { value: 'cinemagraph', label: 'Cinemagraph' },
    { value: 'stop motion', label: 'Stop Motion' },
    { value: 'animation', label: 'Animation' },
  ],
  frameRate: [
    { value: '24', label: '24 Fps' },
    { value: '30', label: '30 Fps' },
    { value: '40', label: '40 Fps' },
    { value: '50', label: '50 Fps' },
    { value: '60', label: '60 Fps' },
  ],
  aspectRatio: [
    { value: '16:9', label: '16:9' },
    { value: '1:1', label: '1:1' },
    { value: '4:3', label: '4:3' },
    { value: '9:16', label: '9:16' },
  ],
  resolution: [
    { value: '4K', label: '4K' },
    { value: '1080p', label: '1080p' },
    { value: '720p', label: '720p' },
    { value: '480p', label: '480p' },
    { value: '360p', label: '360p' },
  ],
  pacing: [
    { value: 'Slow', label: 'Slow' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Fast', label: 'Fast' },
  ],
}
