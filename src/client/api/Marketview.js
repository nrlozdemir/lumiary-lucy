export function getCompetitorTopVideos() {
  return {
    labels: ['360', '480', '720p', '1080p', '4k'],
    datasets: [{
      backgroundColor: '#51adc0',
      data: [
        45, 55, 45, 60, 30
      ]
    }, {
      backgroundColor: '#8567f0',
      data: [
        15, 15, 10, 12, 22
      ]
    }, {
      backgroundColor: '#ff556f',
      data: [
        20, 10, 15, 12, 23
      ]
    },{
      backgroundColor: '#acb0be',
      data: [
        10, 10, 15, 8, 10
      ]
    },{
      backgroundColor: '#5a6386',
      data: [
        10, 10, 15, 8, 15
      ]
    }]
  };
}