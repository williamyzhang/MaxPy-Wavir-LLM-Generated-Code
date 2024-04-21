{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "id": "obj_1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 100, 100, 20]
        }
      },
      {
        "box": {
          "id": "obj_2",
          "maxclass": "newobj",
          "text": "random 600",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 150, 100, 20]
        }
      },
      {
        "box": {
          "id": "obj_3",
          "maxclass": "newobj",
          "text": "+ 200",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 200, 100, 20]
        }
      },
      {
        "box": {
          "id": "obj_4",
          "maxclass": "newobj",
          "text": "metro 500",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 250, 100, 20]
        }
      },
      {
        "box": {
          "id": "obj_5",
          "maxclass": "newobj",
          "text": "toggle",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 300, 40, 20]
        }
      },
      {
        "box": {
          "id": "obj_6",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 350, 100, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["obj_2", 0],
          "destination": ["obj_3", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_3", 0],
          "destination": ["obj_1", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_4", 0],
          "destination": ["obj_2", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_5", 0],
          "destination": ["obj_4", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_1", 0],
          "destination": ["obj_6", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_1", 0],
          "destination": ["obj_6", 1]
        }
      }
    ]
  }
}