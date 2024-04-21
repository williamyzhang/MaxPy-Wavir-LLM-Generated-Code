{
    "patcher": {
      "fileversion": 1,
      "rect": [0, 0, 640, 480],
      "boxes": [
        {
          "box": {
            "maxclass": "newobj",
            "text": "cycle~ 440",
            "numinlets": 2,
            "numoutlets": 1,
            "patching_rect": [100, 100, 50, 20],
            "id": "carrier_osc"
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "cycle~ 10",
            "numinlets": 2,
            "numoutlets": 1,
            "patching_rect": [100, 150, 50, 20],
            "id": "modulator_osc"
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "+~ 1",
            "numinlets": 2,
            "numoutlets": 1,
            "patching_rect": [150, 200, 30, 20],
            "id": "offset"
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "*~",
            "numinlets": 2,
            "numoutlets": 1,
            "patching_rect": [200, 250, 30, 20],
            "id": "multiplier"
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "dac~",
            "numinlets": 2,
            "numoutlets": 0,
            "patching_rect": [250, 300, 40, 20],
            "id": "dac"
          }
        }
      ],
      "lines": [
        {
          "patchline": {
            "source": ["modulator_osc", 0],
            "destination": ["offset", 0]
          }
        },
        {
          "patchline": {
            "source": ["offset", 0],
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