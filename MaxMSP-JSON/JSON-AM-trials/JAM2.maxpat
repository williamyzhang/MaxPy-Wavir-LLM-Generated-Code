{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "bglocked": 0,
    "defrect": [0, 0, 800, 600],
    "openinpresentation": 0,
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [50, 50, 50, 20],
          "id": "osc1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [50, 130, 50, 20],
          "id": "osc2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [250, 50, 30, 20],
          "id": "mult"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [450, 50, 40, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["osc1", 0],
          "destination": ["mult", 0]
        }
      },
      {
        "patchline": {
          "source": ["osc2", 0],
          "destination": ["mult", 1]
        }
      },
      {
        "patchline": {
          "source": ["mult", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["mult", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}