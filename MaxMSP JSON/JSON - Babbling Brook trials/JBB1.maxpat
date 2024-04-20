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
        "id": "noise-source",
        "patching_rect": [50, 50, 50, 20]
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "svf~ 500 0.7",
        "numinlets": 3,
        "numoutlets": 4,
        "outlettype": ["signal", "signal", "signal", "signal"],
        "id": "lowpass-filter",
        "patching_rect": [50, 100, 80, 20]
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "scale~ 0.0001 1 0.1 1",
        "numinlets": 2,
        "numoutlets": 1,
        "id": "scale",
        "patching_rect": [150, 100, 100, 20]
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "gen~ reverb",
        "numinlets": 2,
        "numoutlets": 1,
        "id": "reverb-effect",
        "patching_rect": [200, 200, 80, 20]
      }
    },
    {
      "box": {
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "id": "audio-output",
        "patching_rect": [300, 250, 60, 20]
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": ["noise-source", 0],
        "destination": ["lowpass-filter", 0]
      }
    },
    {
      "patchline": {
        "source": ["lowpass-filter", 2],
        "destination": ["scale", 0]
      }
    },
    {
      "patchline": {
        "source": ["scale", 0],
        "destination": ["reverb-effect", 0]
      }
    },
    {
      "patchline": {
        "source": ["reverb-effect", 0],
        "destination": ["audio-output", 0]
      }
    }
  ]
}
}