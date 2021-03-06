const createDataset = (value) => {
  value = parseInt(value) || 0
  if (value <= 30) {
    return [
      16, 18, 20, 22,
      24, 28, 32, 36,
      40, 48, 58, 70,
      80, 88, 94, 98,
      100,
      98, 90, 80, 70,
      60, 54, 48, 42,
      40, 38, 36, 34,
      32, 30, 28, 26,
      24, 22, 20, 18,
      16, 14, 12, 10
    ]
  }
  if (value > 30 && value <= 40) {
    return [
      28, 32, 36, 40,
      48, 58, 70, 80,
      88, 94, 98,
      100,
      96, 90, 80, 70,
      60, 54, 48, 40,
      38, 37, 36, 35,
      34, 33, 32, 31,
      30, 29, 28, 27,
      26, 25, 24, 23,
      22, 21, 20, 19,
      18
    ]
  }
  if (value > 40 && value <= 50) {
    return [
      16, 18, 20, 22,
      24, 28, 32, 36,
      40, 48, 58, 70,
      80, 88, 94, 98,
      100,
      98, 90, 80, 70,
      64, 56, 48, 42,
      40, 38, 36, 34,
      32, 30, 28, 26,
      24, 22, 20, 18,
      16, 14, 12, 10
    ]
  }
  if (value > 50 && value <= 60) {
    return [
      10, 12, 14, 16,
      18, 20, 22, 24,
      26, 28, 30, 32,
      34, 36, 40, 48,
      58, 70, 80, 88,
      94, 98,
      100,
      98, 90, 80, 70,
      60, 54, 48, 42,
      36, 34, 32, 30,
      28, 26, 24, 22,
      20, 18
    ]
  } else if (value > 60 && value <= 70) {
    return [
      8, 10, 12, 14,
      16, 18, 20, 22,
      24, 26, 28, 30,
      32, 34, 36, 38,
      40, 42, 44, 46,
      48, 58, 70, 80,
      88, 94, 98,
      100,
      98, 90, 80, 70,
      60, 54, 48, 42,
      36, 34, 32, 30,
      28
    ]
  } else if (value > 70 && value <= 80) {
    return [
      8, 9, 10, 11,
      12, 13, 14, 15,
      16, 17, 18, 19,
      20, 21, 22, 23,
      24, 25, 26, 27,
      28, 29, 30, 38,
      42, 48, 58, 68,
      78, 88, 98,
      100,
      98, 90, 80, 70,
      60, 50, 46, 40,
      36
    ]
  } else if (value > 80 && value <= 100) {
    return [
      10, 11, 12, 13,
      14, 15, 16, 17,
      18, 19, 20, 21,
      22, 23, 24, 25,
      26, 27, 28, 29,
      30, 32, 34, 36,
      38, 40, 42, 44,
      46, 48, 58, 68,
      78, 88, 98,
      100,
      98, 90, 80, 70,
      60
    ]
  }
}

export {
  createDataset
}
