{
  "patcher": {
    "box": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "oscillator1",
          "patching_rect": [10, 50, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 550",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "oscillator2",
          "patching_rect": [10, 100, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 490",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "oscillator3",
          "patching_rect": [10, 150, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "line~",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "envelope",
          "patching_rect": [80, 50, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "mixer",
          "patching_rect": [150, 100, 35, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.25",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "volume",
          "patching_rect": [200, 100, 35, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "id": "output",
          "patching_rect": [250, 100, 50, 20]
        }
      }
    ],
    "patchline": [
      {
        "source": ["oscillator1", 0],
        "destination": ["mixer", 0]
      },
      {
        "source": ["oscillator2", 0],
        "destination": ["mixer", 1]
      },
      {
        "source": ["oscillator3", 0],
        "destination": ["mixer", 1]
      },
      {
        "source": ["mixer", 0],
        "destination": ["volume", 0]
      },
      {
        "source": ["envelope", 0],
        "destination": ["volume", 1]
      },
      {
        "source": ["volume", 0],
        "destination": ["output", 0],
        "destination": ["output", 1]
      }
    ]
  }
}