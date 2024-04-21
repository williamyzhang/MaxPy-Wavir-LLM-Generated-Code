{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 780, 580],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "id": "lfo",
          "text": "cycle~ 5",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "id": "sine_wave",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 170, 50, 20],
          "inlettype": ["signal", "signal"],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "id": "math_multiply",
          "text": "*~ 10",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 140, 50, 20],
          "inlettype": ["signal", "float"],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "id": "dac",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 380, 50, 20],
          "inlettype": ["signal", "signal"]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "lfo", 0 ],
          "destination": [ "math_multiply", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "math_multiply", 0 ],
          "destination": [ "sine_wave", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "sine_wave", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "sine_wave", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}