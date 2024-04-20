{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 450],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "cycle1",
          "patching_rect": [50, 50, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "cycle2",
          "patching_rect": [50, 100, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "cycle3",
          "patching_rect": [50, 150, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "cycle4",
          "patching_rect": [50, 200, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 2200",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "cycle5",
          "patching_rect": [50, 250, 45, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.2",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "gain",
          "patching_rect": [150, 100, 30, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "id": "dac",
          "patching_rect": [250, 150, 30, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["cycle1", 0],
          "destination": ["gain", 0]
        }
      },
      {
        "patchline": {
          "source": ["cycle2", 0],
          "destination": ["gain", 1]
        }
      },
      {
        "patchline": {
          "source": ["cycle3", 0],
          "destination": ["gain", 1]
        }
      },
      {
        "patchline": {
          "source": ["cycle4", 0],
          "destination": ["gain", 1]
        }
      },
      {
        "patchline": {
          "source": ["cycle5", 0],
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