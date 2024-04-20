{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 450, 300],
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
          "patching_rect": [50, 100, 50, 20],
          "id": "cycle2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 75, 30, 20],
          "id": "plus"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [300, 75, 40, 20],
          "id": "mult"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [400, 75, 40, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "cycle1", 0 ],
          "destination": [ "plus", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "cycle2", 0 ],
          "destination": [ "plus", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "plus", 0 ],
          "destination": [ "mult", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "mult", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "mult", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}