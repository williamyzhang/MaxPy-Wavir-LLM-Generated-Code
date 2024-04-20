{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "id": "osc_1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "outlets": 1,
          "numinlets": 1,
          "patching_rect": [100, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "osc_2",
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "outlets": 1,
          "numinlets": 1,
          "patching_rect": [100, 100, 50, 20]
        }
      },
      {
        "box": {
          "id": "osc_3",
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "outlets": 1,
          "numinlets": 1,
          "patching_rect": [100, 150, 50, 20]
        }
      },
      {
        "box": {
          "id": "osc_4",
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "outlets": 1,
          "numinlets": 1,
          "patching_rect": [100, 200, 50, 20]
        }
      },
      {
        "box": {
          "id": "osc_5",
          "maxclass": "newobj",
          "text": "cycle~ 2200",
          "outlets": 1,
          "numinlets": 1,
          "patching_rect": [100, 250, 50, 20]
        }
      },
      {
        "box": {
          "id": "mixer",
          "maxclass": "newobj",
          "text": "+~",
          "outlets": 1,
          "numinlets": 5,
          "patching_rect": [100, 300, 30, 20]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "outlets": 0,
          "numinlets": 2,
          "patching_rect": [100, 350, 30, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["osc_1", 0],
          "destination": ["mixer", 0]
        }
      },
      {
        "patchline": {
          "source": ["osc_2", 0],
          "destination": ["mixer", 1]
        }
      },
      {
        "patchline": {
          "source": ["osc_3", 0],
          "destination": ["mixer", 2]
        }
      },
      {
        "patchline": {
          "source": ["osc_4", 0],
          "destination": ["mixer", 3]
        }
      },
      {
        "patchline": {
          "source": ["osc_5", 0],
          "destination": ["mixer", 4]
        }
      },
      {
        "patchline": {
          "source": ["mixer", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["mixer", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}