{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 600, 400],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "id": "sin1",
          "text": "cycle~ 350",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "id": "sin2",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 120, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "id": "gain",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 100, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "id": "dac",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [350, 100, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["sin1", 0],
          "destination": ["gain", 0]
        }
      },
      {
        "patchline": {
          "source": ["sin2", 0],
          "destination": ["gain", 1]
        }
      },
      {
        "patchline": {
          "source": ["gain", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["gain", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}