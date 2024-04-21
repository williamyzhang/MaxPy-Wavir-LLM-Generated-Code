{
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 350",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "osc1",
          "patching_rect": [10, 10, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "osc2",
          "patching_rect": [10, 50, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "amplitude1",
          "patching_rect": [110, 10, 30, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "amplitude2",
          "patching_rect": [110, 50, 30, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "adder",
          "patching_rect": [160, 30, 30, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "id": "dac",
          "patching_rect": [210, 30, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "source": ["osc1", 0],
        "destination": ["amplitude1", 0]
      },
      {
        "source": ["osc2", 0],
        "destination": ["amplitude2", 0]
      },
      {
        "source": ["amplitude1", 0],
        "destination": ["adder", 0]
      },
      {
        "source": ["amplitude2", 0],
        "destination": ["adder", 1]
      },
      {
        "source": ["adder", 0],
        "destination": ["dac", 0]
      },
      {
        "source": ["adder", 0],
        "destination": ["dac", 1]
      }
    ]

}