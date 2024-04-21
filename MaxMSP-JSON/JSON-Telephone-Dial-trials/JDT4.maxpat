{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 500, 300],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 350",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 50],
          "id": "osc1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 100, 50, 50],
          "id": "osc2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 3,
          "numoutlets": 1,
          "patching_rect": [50, 150, 40, 20],
          "id": "amp1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 3,
          "numoutlets": 1,
          "patching_rect": [50, 200, 40, 20],
          "id": "amp2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 250, 40, 20],
          "id": "adder"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [150, 250, 40, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["osc1", 0],
          "destination": ["amp1", 0]
        }
      },
      {
        "patchline": {
          "source": ["osc2", 0],
          "destination": ["amp2", 0]
        }
      },
      {
        "patchline": {
          "source": ["amp1", 0],
          "destination": ["adder", 0]
        }
      },
      {
        "patchline": {
          "source": ["amp2", 0],
          "destination": ["adder", 1]
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