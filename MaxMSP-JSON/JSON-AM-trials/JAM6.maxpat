{
  "patcher": {
    "fileversion": 1,
    "rect": [
      0,
      0,
      495,
      600
    ],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [
            50,
            50,
            64,
            22
          ],
          "id": "carrier_osc"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [
            50,
            150,
            64,
            22
          ],
          "id": "modulator_osc"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [
            200,
            150,
            40,
            22
          ],
          "id": "adder"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [
            200,
            250,
            40,
            22
          ],
          "id": "multiplier"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            200,
            350,
            50,
            22
          ],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [
            "modulator_osc",
            0
          ],
          "destination": [
            "adder",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "adder",
            0
          ],
          "destination": [
            "multiplier",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "carrier_osc",
            0
          ],
          "destination": [
            "multiplier",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "multiplier",
            0
          ],
          "destination": [
            "dac",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "multiplier",
            0
          ],
          "destination": [
            "dac",
            1
          ]
        }
      }
    ]
  }
}