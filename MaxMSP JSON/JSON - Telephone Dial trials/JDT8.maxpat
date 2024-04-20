{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 350",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [120, 50, 50, 20],
          "id": "osc1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [220, 50, 50, 20],
          "id": "osc2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [120, 100, 50, 20],
          "id": "mult1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [220, 100, 50, 20],
          "id": "mult2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [180, 150, 50, 20],
          "id": "add"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "ezdac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [180, 200, 35, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "osc1", 0 ],
          "destination": [ "mult1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "osc2", 0 ],
          "destination": [ "mult2", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "mult1", 0 ],
          "destination": [ "add", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "mult2", 0 ],
          "destination": [ "add", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "add", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "add", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}