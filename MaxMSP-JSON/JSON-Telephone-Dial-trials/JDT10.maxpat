{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 600, 400],
    "boxes": [
      {
        "box": {
          "id": "osc1",
          "maxclass": "newobj",
          "text": "cycle~ 350",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "osc2",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [150, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "m1",
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 150, 30, 20]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 250, 50, 20]
        }
      }
    ],
    "lines": [
      {"source": ["osc1", 0], "destination": ["m1", 0]},
      {"source": ["osc2", 0], "destination": ["m1", 1]},
      {"source": ["m1", 0], "destination": ["dac", 0]},
      {"source": ["m1", 0], "destination": ["dac", 1]}
    ]
  }
}