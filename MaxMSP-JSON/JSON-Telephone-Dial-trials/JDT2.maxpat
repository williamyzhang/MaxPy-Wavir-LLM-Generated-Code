{
  "patcher":{
  "boxes": [
    {
      "box": {
        "maxclass": "newobj",
        "text": "cycle~ 350",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [50, 50, 50, 20],
        "id": "osc1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "cycle~ 440",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [100, 50, 50, 20],
        "id": "osc2"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "*~ 0.5",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [50, 100, 50, 20],
        "id": "amp1"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "*~ 0.5",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [100, 100, 50, 20],
        "id": "amp2"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "+~",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [75, 150, 50, 20],
        "id": "mixer"
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [75, 200, 50, 20],
        "id": "dac"
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": [ "osc1", 0 ],
        "destination": [ "amp1", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "osc2", 0 ],
        "destination": [ "amp2", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "amp1", 0 ],
        "destination": [ "mixer", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "amp2", 0 ],
        "destination": [ "mixer", 1 ]
      }
    },
    {
      "patchline": {
        "source": [ "mixer", 0 ],
        "destination": [ "dac", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "mixer", 0 ],
        "destination": [ "dac", 1 ]
      }
    }
  ]
}
}