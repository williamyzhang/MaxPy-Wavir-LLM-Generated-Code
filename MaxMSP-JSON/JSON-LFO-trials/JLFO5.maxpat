{
  "boxes": [
    {
      "box": {
        "id": "obj_1",
        "maxclass": "newobj",
        "text": "cycle~ 440",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [130, 90, 50, 20]
      }
    },
    {
      "box": {
        "id": "obj_2",
        "maxclass": "newobj",
        "text": "cycle~ 5",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [130, 170, 50, 20]
      }
    },
    {
      "box": {
        "id": "obj_3",
        "maxclass": "newobj",
        "text": "*~ 10",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [130, 250, 40, 20]
      }
    },
    {
      "box": {
        "id": "obj_4",
        "maxclass": "newobj",
        "text": "+~ 440",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [130, 330, 40, 20]
      }
    },
    {
      "box": {
        "id": "obj_5",
        "maxclass": "newobj",
        "text": "cycle~",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [130, 410, 50, 20]
      }
    },
    {
      "box": {
        "id": "obj_6",
        "maxclass": "newobj",
        "text": "ezdac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [130, 490, 50, 20]
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
        "source": ["obj_1", 0],
        "destination": ["obj_4", 1]
      }
    },
    {
      "patchline": {
        "source": ["obj_5", 0],
        "destination": ["obj_6", 0]
      }
    },
    {
      "patchline": {
        "source": ["obj_5", 0],
        "destination": ["obj_6", 1]
      }
    }
  ]

}