{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 400],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20],
          "id": "oscillator"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 5",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 100, 50, 20],
          "id": "lfo"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 150, 50, 20],
          "id": "adder"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 20",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [250, 100, 50, 20],
          "id": "amplitude"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [50, 300, 50, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "oscillator", 0 ],
          "destination": [ "adder", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "lfo", 0 ],
          "destination": [ "amplitude", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "amplitude", 0 ],
          "destination": [ "adder", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "adder", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "adder", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}