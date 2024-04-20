{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20],
          "id": "noise1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 500 0.9",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [50, 150, 50, 20],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 250, 50, 20],
          "id": "reverb1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [50, 350, 50, 20],
          "id": "dac1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["noise1", 0],
          "destination": ["svf1", 0],
          "order": 1
        }
      },
      {
        "patchline": {
          "source": ["svf1", 0],
          "destination": ["reverb1", 0],
          "order": 2
        }
      },
      {
        "patchline": {
          "source": ["reverb1", 0],
          "destination": ["dac1", 0],
          "order": 3
        }
      },
      {
        "patchline": {
          "source": ["reverb1", 0],
          "destination": ["dac1", 1],
          "order": 4
        }
      }
    ]
  }
}