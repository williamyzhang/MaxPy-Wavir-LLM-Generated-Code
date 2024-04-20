{
 
  "boxes": [
    {
      "box": {
        "id": "noise",
        "maxclass": "newobj",
        "text": "noise~",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [10, 10, 60, 30]
      }
    },
    {
      "box": {
        "id": "svf_filter",
        "maxclass": "newobj",
        "text": "svf~ 0.3 2 0.5",  
        "numinlets": 4,
        "numoutlets": 1,
        "patching_rect": [10, 50, 80, 30]
      }
    },
    {
      "box": {
        "id": "reverb",
        "maxclass": "newobj",
        "text": "reverb~ 0.9 0.8",
        "numinlets": 4,
        "numoutlets": 2,
        "patching_rect": [10, 90, 80, 30]
      }
    },
    {
      "box": {
        "id": "dac",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [10, 130, 40, 30]
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": [ "noise", 0 ],
        "destination": [ "svf_filter", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "svf_filter", 0 ],
        "destination": [ "reverb", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "reverb", 0 ],
        "destination": [ "dac", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "reverb", 1 ],
        "destination": [ "dac", 1 ]
      }
    }
  ]

}