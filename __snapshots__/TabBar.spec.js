exports['TabBar Component Rendering matches snapshot 1'] = {
  "type": "div",
  "props": {
    "className": ""
  },
  "children": [
    {
      "type": "div",
      "props": {
        "className": "react-tabs",
        "data-tabs": true
      },
      "children": [
        {
          "type": "ul",
          "props": {
            "className": "react-tabs__tab-list undefined",
            "role": "tablist"
          },
          "children": [
            {
              "type": "li",
              "props": {
                "className": "react-tabs__tab react-tabs__tab--selected",
                "role": "tab",
                "id": "react-tabs-4",
                "aria-selected": "true",
                "aria-disabled": "false",
                "aria-controls": "react-tabs-5",
                "tabIndex": "0"
              },
              "children": [
                "Section 1"
              ]
            },
            {
              "type": "li",
              "props": {
                "className": "react-tabs__tab",
                "role": "tab",
                "id": "react-tabs-6",
                "aria-selected": "false",
                "aria-disabled": "false",
                "aria-controls": "react-tabs-7",
                "tabIndex": null
              },
              "children": [
                "Section 2"
              ]
            }
          ]
        },
        {
          "type": "div",
          "props": {
            "className": "react-tabs__tab-panel react-tabs__tab-panel--selected",
            "role": "tabpanel",
            "id": "react-tabs-5",
            "aria-labelledby": "react-tabs-4"
          },
          "children": [
            {
              "type": "p",
              "props": {},
              "children": [
                "Section 1"
              ]
            }
          ]
        },
        {
          "type": "div",
          "props": {
            "className": "react-tabs__tab-panel",
            "role": "tabpanel",
            "id": "react-tabs-7",
            "aria-labelledby": "react-tabs-6"
          },
          "children": null
        }
      ]
    }
  ]
}
