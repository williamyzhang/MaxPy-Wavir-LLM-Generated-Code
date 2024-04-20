{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 1280, 720],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20],
          "id": "osc1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 200, 50, 20],
          "id": "lfo"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 150, 30, 20],
          "id": "am"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [300, 150, 35, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "lfo", 0 ],
          "destination": [ "am", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "osc1", 0 ],
          "destination": [ "am", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "am", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "am", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}