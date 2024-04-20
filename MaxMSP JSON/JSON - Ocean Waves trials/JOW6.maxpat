{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "pink~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20],
          "id": "pink1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 797 0.5",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [150, 50, 50, 20],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [250, 50, 50, 20],
          "id": "gen1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [350, 50, 50, 20],
          "id": "dac1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "pink1", 0 ],
          "destination": [ "svf1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "svf1", 2 ],
          "destination": [ "gen1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "gen1", 0 ],
          "destination": [ "dac1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "gen1", 0 ],
          "destination": [ "dac1", 1 ]
        }
      }
    ]
  }
}