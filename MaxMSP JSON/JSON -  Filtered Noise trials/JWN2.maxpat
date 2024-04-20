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
          "text": "svf~ 1000 0.5",
          "numinlets": 3,
          "numoutlets": 4,
          "outlettype": ["signal", "signal", "signal", "signal"],
          "patching_rect": [36, 292, 144, 23],
          "id": "svf1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 400, 50, 20],
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
          "destination": [ "dac1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "svf1", 0 ],
          "destination": [ "dac1", 1 ]
        }
      }
    ]
  }
}