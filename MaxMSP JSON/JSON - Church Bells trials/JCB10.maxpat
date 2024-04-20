{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "phasor~ 0.1",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 100, 50, 20],
          "id": "phasor1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 110",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 150, 62, 20],
          "id": "cycle1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 442 0.4",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [50, 200, 100, 20],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 250, 44, 20],
          "id": "gen1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [50, 300, 40, 20],
          "id": "dac1"
        }
      }
    ],
    "patchlines": [
      {
        "source": ["phasor1", 0],
        "destination": ["cycle1", 0]
      },
      {
        "source": ["cycle1", 0],
        "destination": ["svf1", 0]
      },
      {
        "source": ["svf1", 0],
        "destination": ["gen1", 0]
      },
      {
        "source": ["gen1", 0],
        "destination": ["dac1", 0]
      },
      {
        "source": ["gen1", 0],
        "destination": ["dac1", 1]
      }
    ]
  }
}