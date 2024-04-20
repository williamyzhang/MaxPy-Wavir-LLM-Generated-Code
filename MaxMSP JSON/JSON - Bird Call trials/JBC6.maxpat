{
    "boxes": [
    {
      "box": {
        "id": "osc1",
        "maxclass": "newobj",
        "text": "cycle~ 1000",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [10, 10, 50, 20]
      }
    },
    {
      "box": {
        "id": "osc2",
        "maxclass": "newobj",
        "text": "cycle~",
        "args": [200],
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [10, 50, 50, 20]
      }
    },
    {
      "box": {
        "id": "line1",
        "maxclass": "newobj",
        "text": "line~",
        "numinlets": 3,
        "numoutlets": 1,
        "patching_rect": [120, 10, 40, 20]
      }
    },
    {
      "box": {
        "id": "multiply",
        "maxclass": "newobj",
        "text": "*~ 0.5",
        "numinlets": 3,
        "numoutlets": 1,
        "patching_rect": [180, 10, 40, 20]
      }
    },
    {
      "box": {
        "id": "svf",
        "maxclass": "newobj",
        "text": "svf~ 600 0.8 0",
        "numinlets": 4,
        "numoutlets": 4,
        "patching_rect": [250, 10, 75, 20]
      }
    },
    {
      "box": {
        "id": "dac",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [340, 10, 40, 20]
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": ["osc1", 0],
        "destination": ["line1", 0]
      }
    },
    {
      "patchline": {
        "source": ["line1", 0],
        "destination": ["multiply", 0]
      }
    },
    {
      "patchline": {
        "source": ["multiply", 0],
        "destination": ["svf", 0]
      }
    },
    {
      "patchline": {
        "source": ["osc2", 0],
        "destination": ["svf", 3]
      }
    },
    {
      "patchline": {
        "source": ["svf", 0],
        "destination": ["dac", 0]
      },
      "patchline": {
        "source": ["svf", 0],
        "destination": ["dac", 1]
      }
    }
  ]

}