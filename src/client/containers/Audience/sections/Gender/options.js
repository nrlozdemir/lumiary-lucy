import renderLegend from 'Components/Legend/render'

export const moduleFilters = [
  {
    type: 'property',
    selectKey: 'AG-asd',
    placeHolder: 'Resolution',
  },
  {
    type: 'platformEngagement',
    selectKey: 'AG-kms',
    placeHolder: 'Engagement by Platform',
    customOptions: [
      {
        label: 'Facebook',
        options: [{ value: 'facebook|views', label: 'Views' }],
      },
    ],
    defaultValue: { value: 'facebook|views', label: 'Views' },
  },
  {
    type: 'dateRange',
    selectKey: 'AG-wds',
    placeHolder: 'Date',
  },
]

export const moduleLegends = renderLegend([
  { label: 'Male', color: 'coral-pink' },
  { label: 'Female', color: 'cool-blue' },
])
