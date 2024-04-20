{
  "patcher": {
    "fileversion": 1,
    "rect": [
      0,
      0,
      550,
      300
    ],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "obj_noise",
          "patching_rect": [
            50,
            50,
            44,
            22
          ]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 1000 1 0",
          "numinlets": 1,
          "numoutlets": 4,
          "id": "obj_svf",
          "patching_rect": [
            50,
            100,
            70,
            22
          ]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "id": "obj_dac",
          "patching_rect": [
            50,
            200,
            34,
            22
          ]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [
            "obj_noise",
            0
          ],
          "destination": [
            "obj_svf",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj_svf",
            0
          ],
          "destination": [
            "obj_dac",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj_svf",
            0
          ],
          "destination": [
            "obj_dac",
            1
          ]
        }
      }
    ]
  }
}