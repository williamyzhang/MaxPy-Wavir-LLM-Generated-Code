{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "id": "obj_1",
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 60, 20]
        }
      },
      {
        "box": {
          "id": "obj_2",
          "maxclass": "newobj",
          "text": "svf~ 500 0.5 1",
          "numinlets": 3,
          "numoutlets": 1,
          "patching_rect": [50, 100, 90, 20]
        }
      },
      {
        "box": {
          "id": "obj_3",
          "maxclass": "newobj",
          "text": "svf~ 1000 0.7 1",
          "numinlets": 3,
          "numoutlets": 1,
          "patching_rect": [50, 150, 90, 20]
        }
      },
      {
        "box": {
          "id": "obj_4",
          "maxclass": "newobj",
          "text": "reverb~",
          "numinlets": 2,
          "numoutlets": 2,
          "patching_rect": [50, 200, 70, 20]
        }
      },
      {
        "box": {
          "id": "obj_5",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [50, 250, 40, 20]
        }
      }
    ],
    "patchlines": [
      {
        "destination": ["obj_2", 0],
        "source": ["obj_1", 0]
      },
      {
        "destination": ["obj_3", 0],
        "source": ["obj_1", 0]
      },
      {
        "destination": ["obj_4", 0],
        "source": ["obj_2", 0]
      },
      {
        "destination": ["obj_4", 0],
        "source": ["obj_3", 0]
      },
      {
        "destination": ["obj_5", 0],
        "source": ["obj_4", 0]
      },
      {
        "destination": ["obj_5", 1],
        "source": ["obj_4", 1]
      }
    ]
  }
}