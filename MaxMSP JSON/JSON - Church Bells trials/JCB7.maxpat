{
  "boxes": [
    {
      "box": {
        "maxclass": "newobj",
        "text": "cycle~ 391.995",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [50, 50, 50, 20],
        "id": "osc1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "svf~ 797.0 0.5",
        "numinlets": 3,
        "numoutlets": 4,
        "outlettype": ["signal", "signal", "signal", "signal"],
        "patching_rect": [200, 50, 144, 23],
        "id": "filter1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "gen~",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [200, 200, 44, 23],
        "id": "reverb1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [350, 200, 50, 20],
        "id": "dac1"
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": [ "osc1", 0 ],
        "destination": [ "filter1", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "filter1", 1 ],
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