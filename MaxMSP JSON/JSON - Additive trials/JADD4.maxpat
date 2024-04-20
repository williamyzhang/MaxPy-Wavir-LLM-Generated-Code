{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 840, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "id": "obj_1",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [10, 10, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "id": "obj_2",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [10, 50, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "id": "obj_3",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [10, 90, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "id": "obj_4",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [10, 130, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 2200",
          "id": "obj_5",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [10, 170, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "id": "obj_6",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [200, 40, 30, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "id": "obj_7",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [200, 80, 30, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "id": "obj_8",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [200, 120, 30, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "id": "obj_9",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "patching_rect": [200, 160, 30, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "id": "obj_10",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [300, 100, 45, 22]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["obj_1", 0],
          "destination": ["obj_6", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_2", 0],
          "destination": ["obj_6", 1]
        }
      },
      {
        "patchline": {
          "source": ["obj_6", 0],
          "destination": ["obj_7", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_3", 0],
          "destination": ["obj_7", 1]
        }
      },
      {
        "patchline": {
          "source": ["obj_7", 0],
          "destination": ["obj_8", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_4", 0],
          "destination": ["obj_8", 1]
        }
      },
      {
        "patchline": {
          "source": ["obj_8", 0],
          "destination": ["obj_9", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj_5", 0],
          "destination": ["obj_9", 1]
        }
      },
      {
        "patchline": {
          "source": ["obj_9", 0],
          "destination": ["obj_10", 0]
        }
      }
    ]
  }
}