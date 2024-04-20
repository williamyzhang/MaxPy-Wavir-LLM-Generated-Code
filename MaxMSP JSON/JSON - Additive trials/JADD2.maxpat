{
  "patcher": {
    "boxes": [
      {
        "box": {
          "id": "osc1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 45, 20]
        }
      },
      {
        "box": {
          "id": "osc2",
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 100, 45, 20]
        }
      },
      {
        "box": {
          "id": "osc3",
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 150, 45, 20]
        }
      },
      {
        "box": {
          "id": "osc4",
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 200, 45, 20]
        }
      },
      {
        "box": {
          "id": "osc5",
          "maxclass": "newobj",
          "text": "cycle~ 2200",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 250, 45, 20]
        }
      },
      {
        "box": {
          "id": "add~",
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 5,
          "numoutlets": 1,
          "patching_rect": [200, 150, 45, 20]
        }
      },
      {
        "box": {
          "id": "dac~",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [350, 150, 45, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["osc1", 0],
          "destination": ["add~", 0]
        }
      },
      {
        "patchline": {
          "source": ["osc2", 0],
          "destination": ["add~", 1]
        }
      },
      {
        "patchline": {
          "source": ["osc3", 0],
          "destination": ["add~", 2]
        }
      },
      {
        "patchline": {
          "source": ["osc4", 0],
          "destination": ["add~", 3]
        }
      },
      {
        "patchline": {
          "source": ["osc5", 0],
          "destination": ["add~", 4]
        }
      },
      {
        "patchline": {
          "source": ["add~", 0],
          "destination": ["dac~", 0]
        }
      },
      {
        "patchline": {
          "source": ["add~", 0],
          "destination": ["dac~", 1]
        }
      }
    ]
  }
}