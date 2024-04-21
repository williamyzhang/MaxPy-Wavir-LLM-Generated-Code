{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "id": "mod_osc",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [80, 100, 50, 20]
        }
      },
      {
        "box": {
          "id": "carrier_osc",
          "maxclass": "newobj",
          "text": "cycle~ 220",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [80, 200, 50, 20]
        }
      },
      {
        "box": {
          "id": "mod_index",
          "maxclass": "newobj",
          "text": "*~ 100",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [160, 150, 50, 20]
        }
      },
      {
        "box": {
          "id": "add~",
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [240, 200, 40, 20]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [320, 250, 50, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["mod_osc", 0],
          "destination": ["mod_index", 0]
        }
      },
      {
        "patchline": {
          "source": ["mod_index", 0],
          "destination": ["add~", 0]
        }
      },
      {
        "patchline": {
          "source": ["carrier_osc", 0],
          "destination": ["add~", 1]
        }
      },
      {
        "patchline": {
          "source": ["add~", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["add~", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}