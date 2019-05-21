export default function (min, max) {
  const randomMap = () => ([
    {
      toolTip: Math.round(Math.random() * 25000),
      visual: 'youtube',
    },
    {
      toolTip: Math.round(Math.random() * 10000),
      visual: 'facebook',
    },
    {
      toolTip: Math.round(Math.random() * 15000),
      visual: 'twitter',
    },
    {
      toolTip: Math.round(Math.random() * 15000),
      visual: 'instagram',
    },
  ]);

  const mapData = [...Array(101)].map((el, index) => ({
    bubblesMales: randomMap(),
    bubblesFemales: randomMap(),
    bubblesBoth: randomMap()
  }))

  const objectData = mapData.reduce((object, value, index) => {
    object[index] = value;
    return object;
  }, {});

  const minmaxTotal = Object.keys(objectData).filter(key => parseInt(key) >= min && parseInt(key) <= max)
    .reduce((object, value) => {
      object["bubblesMales"] = objectData[value]["bubblesMales"].map((val, index) => ({
        ...val,
        toolTip: object["bubblesMales"] ? val.toolTip + object["bubblesMales"][index].toolTip : val.toolTip,
      }))

      object["bubblesFemales"] = objectData[value]["bubblesFemales"].map((val, index) => ({
        ...val,
        toolTip: object["bubblesFemales"] ? val.toolTip + object["bubblesFemales"][index].toolTip : val.toolTip,
      }))

      object["bubblesBoth"] = objectData[value]["bubblesBoth"].map((val, index) => ({
        ...val,
        toolTip: object["bubblesBoth"] ? val.toolTip + object["bubblesBoth"][index].toolTip : val.toolTip,
      }))

      return object;
    }, {})

  return minmaxTotal;
}
