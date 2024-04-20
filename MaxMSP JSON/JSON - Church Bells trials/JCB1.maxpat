{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 640, 480],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 220",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20],
          "id": "carrier_osc"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 660",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 200, 50, 20],
          "id": "modulator_osc"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 50",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 150, 40, 20],
          "id": "mod_index"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [300, 200, 40, 20],
          "id": "multiplier"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [400, 250, 60, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["modulator_osc", 0],
          "destination": ["mod_index", 0]
        }
      },
      {
        "patchline": {
          "source": ["mod_index", 0],
          "destination": ["multiplier", 1]
        }
      },
      {
        "patchline": {
          "source": ["carrier_osc", 0],
          "destination": ["multiplier", 0]
        }
      },
      {
        "patchline": {
          "source": ["multiplier", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["multiplier", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}