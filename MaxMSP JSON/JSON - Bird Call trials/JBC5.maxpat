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
          "text": "svf~ 4000 0.8",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": [
            "signal",
            "signal",
            "signal",
            "signal"
          ],
          "patching_rect": [50, 150, 50, 20],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 5",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [150, 150, 50, 20],
          "id": "lfo1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [250, 150, 50, 20],
          "id": "multiply1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [50, 250, 50, 20],
          "id": "dac1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["noise1", 0],
          "destination": ["svf1", 0]
        }
      },
      {
        "patchline": {
          "source": ["svf1", 2],
          "destination": ["multiply1", 0]
        }
      },
      {
        "patchline": {
          "source": ["lfo1", 0],
          "destination": ["multiply1", 1]
        }
      },
      {
        "patchline": {
          "source": ["multiply1", 0],
          "destination": ["dac1", 0]
        }
      },
      {
        "patchline": {
          "source": ["multiply1", 0],
          "destination": ["dac1", 1]
        }
      }
    ]
  }
}