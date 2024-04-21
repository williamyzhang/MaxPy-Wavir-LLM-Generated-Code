{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 700, 500],
    "boxes": [
      {
        "box": {
          "id": "obj_1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "fontsize": 12,
          "patching_rect": [50, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "obj_2",
          "maxclass": "newobj",
          "text": "cycle~ 5",
          "numinlets": 2,
          "numoutlets": 1,
          "fontsize": 12,
          "patching_rect": [50, 150, 50, 20]
        }
      },
      {
        "box": {
          "id": "obj_3",
          "maxclass": "newobj",
          "text": "*~ 10",
          "numinlets": 2,
          "numoutlets": 1,
          "fontsize": 12,
          "patching_rect": [150, 150, 30, 20]
        }
      },
      {
        "box": {
          "id": "obj_4",
          "maxclass": "newobj",
          "text": "+~ 440",
          "numinlets": 3,
          "numoutlets": 1,
          "fontsize": 12,
          "patching_rect": [250, 100, 30, 20]
        }
      },
      {
        "box": {
          "id": "obj_5",
          "maxclass": "newobj",
          "text": "cycle~",
          "numinlets": 2,
          "numoutlets": 1,
          "fontsize": 12,
          "patching_rect": [400, 100, 40, 20]
        }
      },
      {
        "box": {
          "id": "obj_6",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "fontsize": 12,
          "patching_rect": [500, 100, 40, 20]
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
          "destination": ["obj_4", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_4", 0],
          "destination": ["obj_5", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_5", 0],
          "destination": ["obj_6", 0]
        }
      }
    ]
  }
}