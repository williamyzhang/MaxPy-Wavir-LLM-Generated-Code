{
  "patcher":{
  "boxes": [
    {
      "box": {
        "id": "noise_obj",
        "maxclass": "newobj",
        "text": "noise~",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [10, 10, 50, 20]
      }
    },
    {
      "box": {
        "id": "svf_obj",
        "maxclass": "newobj",
        "text": "svf~ 1000 1 ",
        "numinlets": 3,
        "numoutlets": 4,
        "patching_rect": [10, 40, 50, 20]
      }
    },
    {
      "box": {
        "id": "dac_obj",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [10, 70, 50, 20]
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": ["noise_obj", 0],
        "destination": ["svf_obj", 0],
        "order": 1
      }
    },
    {
      "patchline": {
        "source": ["svf_obj", 0],
        "destination": ["dac_obj", 0],
        "order": 2
      }
    },
    {
      "patchline": {
        "source": ["svf_obj", 0],
        "destination": ["dac_obj", 1],
        "order": 3
      }
    }
  ]
}
}