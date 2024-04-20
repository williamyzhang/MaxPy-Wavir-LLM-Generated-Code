{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 400],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "id": "modulator",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 50, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 100",
          "id": "modulation_index",
          "numinlets": 3,
          "numoutlets": 1,
          "patching_rect": [50, 100, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~ 440",
          "id": "carrier_frequency",
          "numinlets": 3,
          "numoutlets": 1,
          "patching_rect": [150, 150, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~",
          "id": "carrier",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [250, 200, 45, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "id": "dac",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [50, 300, 45, 22]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "modulator", 0 ],
          "destination": [ "modulation_index", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "modulation_index", 0 ],
          "destination": [ "carrier_frequency", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "carrier_frequency", 0 ],
          "destination": [ "carrier", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "carrier", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "carrier", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}