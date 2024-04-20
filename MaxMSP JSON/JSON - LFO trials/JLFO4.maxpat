{
  "patcher": {
    "boxes": [
      {
        "box": {
          "id": "wave_generator",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 100, 45, 22]
        }
      },
      {
        "box": {
          "id": "lfo",
          "maxclass": "newobj",
          "text": "cycle~ 5",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 45, 22]
        }
      },
      {
        "box": {
          "id": "multiply",
          "maxclass": "newobj",
          "text": "*~ 10",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 150, 30, 22]
        }
      },
      {
        "box": {
          "id": "adder",
          "maxclass": "newobj",
          "text": "+~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [150, 200, 30, 22]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [200, 250, 30, 22]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "lfo", 0 ],
          "destination": [ "multiply", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "multiply", 0 ],
          "destination": [ "adder", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "adder", 0 ],
          "destination": [ "wave_generator", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "wave_generator", 0 ],
          "destination": [ "dac", 0 ]
        }
      }
    ]
  }
}