{
  "boxes": [
    {
      "box": {
        "maxclass": "newobj",
        "text": "cycle~ 440",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [10, 50, 50, 20],
        "id": "osc1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "svf~ 240. 0.5",
        "numinlets": 3,
        "numoutlets": 4,
        "outlettype": ["signal", "signal", "signal", "signal"],
        "patching_rect": [10, 100, 80, 25],
        "id": "svf1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "gen~",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [10, 150, 50, 20],
        "id": "reverb1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [10, 200, 50, 20],
        "id": "dac"
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": [ "osc1", 0 ],
        "destination": [ "svf1", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "svf1", 2 ],
        "destination": [ "reverb1", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "reverb1", 0 ],
        "destination": [ "dac", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "reverb1", 0 ],
        "destination": [ "dac", 1 ]
      }
    }
  ]
}