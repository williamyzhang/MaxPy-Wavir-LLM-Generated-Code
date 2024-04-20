{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 300],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "id": "sine_wave",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 5",
          "id": "lfo",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 100, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "id": "adder",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 150, 30, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 10",
          "id": "amplitude",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 200, 40, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "id": "dac",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [150, 250, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["lfo", 0],
          "destination": ["amplitude", 0]
        }
      },
      {
        "patchline": {
          "source": ["amplitude", 0],
          "destination": ["adder", 1]
        }
      },
      {
        "patchline": {
          "source": ["sine_wave", 0],
          "destination": ["adder", 0]
        }
      },
      {
        "patchline": {
          "source": ["adder", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["adder", 0],
          "destination": ["dac", 1]
        }
      }
    ]
  }
}