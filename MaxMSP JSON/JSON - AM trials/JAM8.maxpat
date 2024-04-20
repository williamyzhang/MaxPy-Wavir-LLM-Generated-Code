{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "fontsize": 12,
          "id": "carrier",
          "patching_rect": [100, 50, 100, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "fontsize": 12,
          "id": "modulator",
          "patching_rect": [100, 150, 100, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "fontsize": 12,
          "id": "amplitude_multiplier",
          "patching_rect": [250, 100, 40, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "fontsize": 12,
          "id": "dac",
          "patching_rect": [400, 100, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["carrier", 0],
          "destination": ["amplitude_multiplier", 0]
        }
      },
      {
        "patchline": {
          "source": ["modulator", 0],
          "destination": ["amplitude_multiplier", 1]
        }
      },
      {
        "patchline": {
          "source": ["amplitude_multiplier", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["amplitude_multiplier", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}