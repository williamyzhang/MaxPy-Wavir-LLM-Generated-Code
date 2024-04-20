{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "id": "obj_sine_base",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 100, 30, 22]
        }
      },
      {
        "box": {
          "id": "obj_gain_base",
          "maxclass": "newobj",
          "text": "*~ 0.2",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [150, 100, 30, 22]
        }
      },
      {
        "box": {
          "id": "obj_dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [200, 200, 45, 22]
        }
      },
      {
        "box": {
          "id": "obj_sine_2",
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 150, 30, 22]
        }
      },
      {
        "box": {
          "id": "obj_gain_2",
          "maxclass": "newobj",
          "text": "*~ 0.15",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [150, 150, 30, 22]
        }
      },
      {
        "box": {
          "id": "gain_sum",
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [275, 150, 30, 22]
        }
      },
      {
        "box": {
          "id": "obj_sine_3",
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 200, 30, 22]
        }
      },
      {
        "box": {
          "id": "obj_gain_3",
          "maxclass": "newobj",
          "text": "*~ 0.1",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [150, 200, 30, 22]
        }
      },
      {
        "box": {
          "id": "obj_sine_4",
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 250, 30, 22]
        }
      },
      {
        "box": {
          "id": "obj_gain_4",
          "maxclass": "newobj",
          "text": "*~ 0.05",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [150, 250, 30, 22]
        }
      }
    ],
    "lines": [
      {"patchline": {"source": [ "obj_sine_base", 0 ], "destination": ["obj_gain_base", 0 ]}},
      {"patchline": {"source": [ "obj_gain_base", 0 ], "destination": ["gain_sum", 0 ]}},
      {"patchline": {"source": [ "obj_sine_2", 0 ], "destination": ["obj_gain_2", 0 ]}},
      {"patchline": {"source": [ "obj_gain_2", 0 ], "destination": ["gain_sum", 1 ]}},
      {"patchline": {"source": [ "gain_sum", 0 ], "destination": ["obj_dac", 0 ]}},
      {"patchline": {"source": [ "obj_sine_3", 0 ], "destination": ["obj_gain_3", 0 ]}},
      {"patchline": {"source": [ "obj_gain_3", 0 ], "destination": ["gain_sum", 1 ]}},
      {"patchline": {"source": [ "obj_sine_4", 0 ], "destination": ["obj_gain_4", 0 ]}},
      {"patchline": {"source": [ "obj_gain_4", 0 ], "destination": ["gain_sum", 1 ]}}
    ]
  }
}