{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 400],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "id": "carrier_osc",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "id": "modulator_osc",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 50, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "id": "multiplier",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [125, 100, 30, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "id": "audio_out",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [125, 150, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["carrier_osc", 0],
          "destination": ["multiplier", 0]
        }
      },
      {
        "patchline": {
          "source": ["modulator_osc", 0],
          "destination": ["multiplier", 1]
        }
      },
      {
        "patchline": {
          "source": ["multiplier", 0],
          "destination": ["audio_out", 0]
        }
      }
    ]
  }
}