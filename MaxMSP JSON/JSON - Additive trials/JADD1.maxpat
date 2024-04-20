{
  "patcher": {
    "boxes": [
      {
        "box": {
          "id": "b1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20]
        }
      },
      {
        "box": {
          "id": "b2",
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 140, 50, 20]
        }
      },
      {
        "box": {
          "id": "b3",
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 180, 50, 20]
        }
      },
      {
        "box": {
          "id": "b4",
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 220, 50, 20]
        }
      },
      {
        "box": {
          "id": "b5",
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [300, 200, 30, 20]
        }
      },
      {
        "box": {
          "id": "b6",
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [300, 250, 30, 20]
        }
      },
      {
        "box": {
          "id": "b7",
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [400, 225, 30, 20]
        }
      },
      {
        "box": {
          "id": "b8",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [500, 225, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["b1", 0],
          "destination": ["b5", 0]
        }
      },
      {
        "patchline": {
          "source": ["b2", 0],
          "destination": ["b5", 0]
        }
      },
      {
        "patchline": {
          "source": ["b3", 0],
          "destination": ["b6", 0]
        }
      },
      {
        "patchline": {
          "source": ["b4", 0],
          "destination": ["b6", 0]
        }
      },
      {
        "patchline": {
          "source": ["b5", 0],
          "destination": ["b7", 0]
        }
      },
      {
        "patchline": {
          "source": ["b6", 0],
          "destination": ["b7", 0]
        }
      },
      {
        "patchline": {
          "source": ["b7", 0],
          "destination": ["b8", 0]
        }
      }
    ]
  }
}