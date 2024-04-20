{
  "patcher": {
    "boxes": [
      {
        "box": {
          "id": "oscillator1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 22]
        }
      },
      {
        "box": {
          "id": "modulator",
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 200, 50, 22]
        }
      },
      {
        "box": {
          "id": "multiply",
          "maxclass": "newobj",
          "text": "*~ 100",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [250, 150, 50, 22]
        }
      },
      {
        "box": {
          "id": "add",
          "maxclass": "newobj",
          "text": "+~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [250, 250, 50, 22]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [400, 200, 50, 22]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "modulator", 0 ],
          "destination": [ "multiply", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "multiply", 0 ],
          "destination": [ "add", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "add", 0 ],
          "destination": [ "oscillator1", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "oscillator1", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "oscillator1", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}