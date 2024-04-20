{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 600, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 70, 20],
          "id": "noise1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 250 0.5",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [200, 50, 60, 20],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [350, 190, 40, 20],
          "id": "reverb1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "ezdac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [200, 300, 35, 20],
          "id": "output1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["noise1", 0],
          "destination": ["svf1", 0],
          "id": "line1"
        }
      },
      {
        "patchline": {
          "source": ["svf1", 1],
          "destination": ["reverb1", 0],
          "id": "line2"
        }
      },
      {
        "patchline": {
          "source": ["reverb1", 0],
          "destination": ["output1", 0],
          "id": "line3"
        }
      },
      {
        "patchline": {
          "source": ["reverb1", 0],
          "destination": ["output1", 1],
          "id": "line4"
        }
      }
    ]
  }
}