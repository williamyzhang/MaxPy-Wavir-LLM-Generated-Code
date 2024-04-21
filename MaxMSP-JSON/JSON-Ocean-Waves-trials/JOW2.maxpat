{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 8,
      "minor": 1,
      "revision": 0,
      "architecture": "x64",
      "modernui": 1
    },
    "rect": [
      100.0,
      100.0,
      800.0,
      600.0
    ],
    "bglocked": 0,
    "openinpresentation": 0,
    "default_fontsize": 12.0,
    "default_fontface": 0,
    "default_fontname": "Arial",
    "gridonopen": 1,
    "gridsize": [15.0, 15.0],
    "gridsnaponopen": 1,
    "toolbarvisible": 1,
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [
            50,
            50,
            100,
            20
          ],
          "id": "noise1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 2000 0.9",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": [
            "signal",
            "signal",
            "signal",
            "signal"
          ],
          "patching_rect": [
            50,
            150,
            100,
            20
          ],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [
            50,
            250,
            100,
            20
          ],
          "id": "reverb1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            50,
            350,
            100,
            20
          ],
          "id": "dac1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [
            "noise1",
            0
          ],
          "destination": [
            "svf1",
            0
          ],
          "hidden": 0,
          "midpoints": []
        }
      },
      {
        "patchline": {
          "source": [
            "svf1",
            1
          ],
          "destination": [
            "reverb1",
            0
          ],
          "hidden": 0,
          "midpoints": []
        }
      },
      {
        "patchline": {
          "source": [
            "reverb1",
            0
          ],
          "destination": [
            "dac1",
            0
          ],
          "hidden": 0,
          "midpoints": []
        }
      }
    ]
  }
}