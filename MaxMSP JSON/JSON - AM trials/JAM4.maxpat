{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 300],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "id": "cycle1",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [100, 50, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "id": "cycle2",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [100, 100, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "id": "mult",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [100, 150, 30, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "id": "output",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": ["signal", "signal"],
          "patching_rect": [100, 200, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["cycle1", 0],
          "destination": ["mult", 0]
        }
      },
      {
        "patchline": {
          "source": ["cycle2", 0],
          "destination": ["mult", 1]
        }
      },
      {
        "patchline": {
          "source": ["mult", 0],
          "destination": ["output", 0]
        }
      }
    ]
  }
}