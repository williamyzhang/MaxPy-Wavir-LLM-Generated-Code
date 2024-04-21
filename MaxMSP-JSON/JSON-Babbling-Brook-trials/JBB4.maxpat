{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 400],
    "bglocked": 0,
    "defrect": [0, 0, 550, 400],
    "openinpresentation": 0,
    "boxes": [
      {
        "box": {
          "id": "noise_gen",
          "maxclass": "newobj",
          "text": "noise~",
          "patching_rect": [10, 10, 50, 20]
        }
      },
      {
        "box": {
          "id": "filter_lowpass",
          "maxclass": "newobj",
          "text": "svf~ 300 0.7 2",
          "patching_rect": [10, 40, 100, 20]
        }
      },
      {
        "box": {
          "id": "reverb",
          "maxclass": "newobj",
          "text": "reverb~ 0.9 0.9",
          "patching_rect": [10, 100, 100, 20]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "patching_rect": [10, 130, 50, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["noise_gen", 0],
          "destination": ["filter_lowpass", 0]
        }
      },
      {
        "patchline": {
          "source": ["filter_lowpass", 0],
          "destination": ["reverb", 0]
        }
      },
      {
        "patchline": {
          "source": ["reverb", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["reverb", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}