{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 207",
          "fontsize": 12,
          "id": "osc1",
          "patching_rect": [50, 50, 100, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "adsr~ 0.01 0.5 0.3 1",
          "fontsize": 12,
          "id": "env1",
          "patching_rect": [50, 150, 100, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 300 0.5 1",
          "fontsize": 12,
          "id": "filter1",
          "patching_rect": [50, 250, 100, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "reverb~ 0.8",
          "fontsize": 12,
          "id": "reverb1",
          "patching_rect": [50, 350, 100, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "fontsize": 12,
          "id": "output",
          "patching_rect": [50, 450, 100, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["osc1", 0],
          "destination": ["env1", 0]
        }
      },
      {
        "patchline": {
          "source": ["env1", 0],
          "destination": ["filter1", 0]
        }
      },
      {
        "patchline": {
          "source": ["filter1", 0],
          "destination": ["reverb1", 0]
        }
      },
      {
        "patchline": {
          "source": ["reverb1", 0],
          "destination": ["output", 0]
        }
      }
    ]
  }
}