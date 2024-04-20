{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [10, 10, 50, 20],
          "id": "noise1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 797 0.5",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [10, 50, 100, 20],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [10, 90, 50, 20],
          "id": "reverb1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [10, 130, 50, 20],
          "id": "dac1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "noise1", 0 ],
          "destination": [ "svf1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "svf1", 0 ],
          "destination": [ "reverb1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "reverb1", 0 ],
          "destination": [ "dac1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "reverb1", 0 ],
          "destination": [ "dac1", 1 ]
        }
      }
    ]
  }
}