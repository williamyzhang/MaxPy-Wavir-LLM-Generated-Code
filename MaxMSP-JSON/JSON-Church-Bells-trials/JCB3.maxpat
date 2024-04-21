{
  "patcher": {
    "fileversion": 1,
    "rect": [
      0.0,
      0.0,
      550.0,
      700.0
    ],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 110",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [
            100.0,
            100.0,
            50.0,
            20.0
          ],
          "id": "cycle1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 110 0.1 ",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": [
            "signal",
            "signal",
            "signal",
            "signal"
          ],
          "patching_rect": [
            100.0,
            200.0,
            100.0,
            40.0
          ],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~ reverb",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [
            100.0,
            300.0,
            70.0,
            20.0
          ],
          "id": "gen1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            100.0,
            400.0,
            50.0,
            20.0
          ],
          "id": "dac1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [
            "cycle1",
            0
          ],
          "destination": [
            "svf1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "svf1",
            2
          ],
          "destination": [
            "gen1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gen1",
            0
          ],
          "destination": [
            "dac1",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "gen1",
            0
          ],
          "destination": [
            "dac1",
            1
          ]
        }
      }
    ]
  }
}