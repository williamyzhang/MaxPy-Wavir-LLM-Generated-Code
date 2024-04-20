{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 300],
    "boxes": [
      {
        "box": {
          "id": "osc1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [40, 50, 85, 20]
        }
      },
      {
        "box": {
          "id": "osc2",
          "maxclass": "newobj",
          "text": "cycle~ 200",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [40, 150, 85, 20]
        }
      },
      {
        "box": {
          "id": "times",
          "maxclass": "newobj",
          "text": "*~ 200",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [150, 100, 40, 20]
        }
      },
      {
        "box": {
          "id": "plus",
          "maxclass": "newobj",
          "text": "+~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [220, 50, 40, 20]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [300, 50, 50, 20]
        }
      }
    ],
    "lines": [
     {
            "patchline": {
              "source": [ "osc1", 0 ],
              "destination": [ "plus", 1 ]
            }
     },
     {
        "patchline": {
          "source": [ "osc2", 0 ],
          "destination": [ "times", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "times", 0 ],
          "destination": [ "plus", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "plus", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "plus", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}