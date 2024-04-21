{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "bglocked": 0,
    "defrect": [0, 0, 800, 600],
    "openinpresentation": 0,
    "openinpresentation": 0,
    "default_fontsize": 12.0,
    "default_fontface": 0,
    "default_fontname": "Arial",
    "objects": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "fontsize": 12,
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 100, 124, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~",
          "fontsize": 12,
          "numinlets": 4,
          "numoutlets": 1,
          "patching_rect": [100, 150, 64, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "fontsize": 12,
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 200, 104, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "line~",
          "fontsize": 12,
          "numinlets": 5,
          "numoutlets": 1,
          "patching_rect": [100, 250, 64, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.3",
          "fontsize": 12,
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 300, 64, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "fontsize": 12,
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 350, 264, 20]
        }
      },
      {
        "box": {
          "maxclass": "patchline",
          "patchline": {
            "source": [0, 0],
            "destination": [1, 0],
            "midpoints": [],
            "hidden": 0
          }
        }
      },
      {
        "box": {
          "maxclass": "patchline",
          "patchline": {
            "source": [2, 0],
            "destination": [1, 0],
            "midpoints": [],
            "hidden": 0
          }
        }
      },
      {
        "box": {
          "maxclass": "patchline",
          "patchline": {
            "source": [1, 0],
            "destination": [3, 0],
            "midpoints": [],
            "hidden": 0
          }
        }
      },
      {
        "box": {
          "maxclass": "patchline",
          "patchline": {
            "source": [3, 0],
            "destination": [4, 0],
            "midpoints": [],
            "hidden": 0
          }
        }
      },
      {
        "box": {
          "maxclass": "patchline",
          "patchline": {
            "source": [4, 0],
            "destination": [5, 0],
            "midpoints": [],
            "hidden": 0
          }
        }
      }
    ]
  }
}