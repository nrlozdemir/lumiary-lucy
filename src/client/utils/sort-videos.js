import { searchTermInText } from 'Utils'

export function sortVideos(videos, filters) {
  const { Search, OrderedBy, AgeRange, Gender, Duration, radioColorSelected, VideoFormat, AspectRatio, FramesPerSecond, Resolution, Pacing, Facebook, Instagram, Youtube, Twitter } = filters;
  let newVideos = [...videos];

  if ([Facebook, Instagram, Youtube, Twitter].some(value => value)) {
    newVideos = newVideos.filter(({ socialIcon }) => ({ Facebook, Instagram, Youtube, Twitter }[socialIcon]));
  }

  if (AgeRange) {
    newVideos = newVideos.filter(({ ageRange }) => ageRange === AgeRange.value);
  }

  if (Gender) {
    newVideos = newVideos.filter(({ gender }) => gender === Gender.value);
  }

  if (Duration) {
    const [min, max] = Duration;
    newVideos = newVideos.filter(({ duration }) => duration >= min && duration <= max);
  }

  if (radioColorSelected) {
    newVideos = newVideos.filter(({ dominantColor }) => dominantColor === radioColorSelected.color);
  }

  if (VideoFormat) {
    newVideos = newVideos.filter(({ format }) => format === VideoFormat.value);
  }

  if (AspectRatio) {
    newVideos = newVideos.filter(({ aspectRatio }) => aspectRatio === AspectRatio.value);
  }

  if (FramesPerSecond) {
    newVideos = newVideos.filter(({ frameRate }) => frameRate == FramesPerSecond.value);
  }

  if (Resolution) {
    newVideos = newVideos.filter(({ resolution }) => resolution === Resolution.value);
  }

  if (Pacing) {
    newVideos = newVideos.filter(({ pacing }) => pacing === Pacing.value);
  }

  if (OrderedBy) {
    let orderBy;
    switch (OrderedBy.value) {
      case 'filterMostViewed':
        orderBy = 'viewCount';
        break;
      case 'filterMostLiked':
        orderBy = 'likeCount';
        break;
      case 'filterMostShared':
        orderBy = 'shareCount';
        break;
      case 'filterMostCommented':
        orderBy = 'commentCount';
        break;
    }

    newVideos = newVideos.sort((prev, next) => prev[orderBy] < next[orderBy] ? 1 : -1);
  }

  if (Search && Search.value) {
    newVideos = newVideos.filter(({ title }) => searchTermInText(title, Search.value, Search.new));
  }

  return newVideos;
}
