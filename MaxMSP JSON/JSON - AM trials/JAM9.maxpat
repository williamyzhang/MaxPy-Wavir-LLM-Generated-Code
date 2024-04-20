{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20],
          "id": "osc1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 150, 50, 20],
          "id": "lfo"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 100, 30, 20],
          "id": "mult"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [350, 100, 40, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "osc1", 0 ],
          "destination": [ "mult", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "lfo", 0 ],
          "destination": [ "mult", 1 ]
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