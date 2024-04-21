{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "pink~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 75, 50, 20],
          "id": "pinkNoise"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 800 0.3",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [150, 75, 100, 20],
          "id": "svfHigh"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 200 0.2",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [150, 100, 100, 20],
          "id": "svfLow"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [275, 75, 40, 20],
          "id": "reverbEffect"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [400, 75, 40, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "pinkNoise", 0 ],
          "destination": [ "svfHigh", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "pinkNoise", 0 ],
          "destination": [ "svfLow", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "svfHigh", 3 ],
          "destination": [ "gen~", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "svfLow", 0 ],
          "destination": [ "reverbEffect", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "reverbEffect", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "reverbEffect", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}