{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 600, 400],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 2,
          "patching_rect": [40, 40, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 800 0.4 ",
          "numinlets": 4,
          "numoutlets": 4,
          "patching_rect": [40, 90, 90, 20],
          "description": "State-variable filter to tone the noise."
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gain~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [40, 150, 50, 20],
          "description": "Control volume of the output sound."
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [40, 210, 50, 20],
          "description": "Audio output"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [0, 0],
          "destination": [1, 0],
          "hidden": 0,
          "midpoints": []
        }
      },
      {
        "patchline": {
          "source": [1, 0],
          "destination": [2, 0],
          "hidden": 0,
          "midpoints": []
        }
      },
      {
        "patchline": {
          "source": [2, 0],
          "destination": [3, 0],
          "hidden": 0,
          "midpoints": []
        }
      }
    ]
  }
}