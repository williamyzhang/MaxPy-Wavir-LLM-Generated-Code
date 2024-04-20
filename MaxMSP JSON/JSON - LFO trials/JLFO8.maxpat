{
    "patcher":{
    "boxes": [
    {
      "box": {
        "id": "obj_1",
        "maxclass": "newobj",
        "text": "cycle~ 440",
        "numinlets": 1,
        "numoutlets": 2,
        "patching_rect": [10, 10, 100, 20]
      }
    },
    {
      "box": {
        "id": "obj_2",
        "maxclass": "newobj",
        "text": "cycle~ 5",
        "numinlets": 1,
        "numoutlets": 2,
        "patching_rect": [10, 50, 100, 20]
      }
    },
    {
      "box": {
        "id": "obj_3",
        "maxclass": "newobj",
        "text": "*~ 10",
        "numinlets": 2,
        "numoutlets": 2,
        "patching_rect": [10, 90, 100, 20]
      }
    },
    {
      "box": {
        "id": "obj_4",
        "maxclass": "newobj",
        "text": "+~ 440",
        "numinlets": 2,
        "numoutlets": 2,
        "patching_rect": [10, 130, 100, 20]
      }
    },
    {
      "box": {
        "id": "obj_5",
        "maxclass": "newobj",
        "text": "cycle~",
        "numinlets": 1,
        "numoutlets": 2,
        "patching_rect": [200, 10, 100, 20]
      }
    },
    {
      "box": {
        "id": "obj_6",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [200, 130, 100, 20]
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
        "destination": ["obj_4", 1]
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
    },
    {
      "patchline": {
        "source": ["obj_5", 0],
        "destination": ["obj_6", 1]
      }
    }
    ]
  }
}