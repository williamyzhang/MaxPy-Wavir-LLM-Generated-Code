{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "id": "obj_1",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 5",
          "id": "obj_2",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 150, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 10",
          "id": "obj_3",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 200, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~ 440",
          "id": "obj_4",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 250, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~",
          "id": "obj_5",
          "numinlets": 0,
          "numoutlets": 1,
          "patching_rect": [100, 300, 50, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "id": "obj_6",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 350, 50, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "obj_2", 0 ],
          "destination": [ "obj_3", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj_3", 0 ],
          "destination": [ "obj_4", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj_4", 0 ],
          "destination": [ "obj_5", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj_5", 0 ],
          "destination": [ "obj_6", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj_5", 0 ],
          "destination": [ "obj_6", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj_1", 0 ],
          "destination": [ "obj_4", 0 ]
        }
      }
    ]
  }
}