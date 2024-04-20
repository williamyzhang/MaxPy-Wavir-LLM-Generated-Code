{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 350",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20],
          "id": "cycle1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [150, 50, 50, 20],
          "id": "cycle2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 150, 50, 20],
          "id": "multiply"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 250, 50, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "cycle1", 0 ],
          "destination": [ "multiply", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "cycle2", 0 ],
          "destination": [ "multiply", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "multiply", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "multiply", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}