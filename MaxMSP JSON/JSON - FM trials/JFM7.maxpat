{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 500, 300],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "carrier_osc",
          "patching_rect": [10, 10, 70, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "modulator_osc",
          "patching_rect": [10, 70, 70, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "modulator_scale",
          "patching_rect": [10, 130, 70, 20]
        }
      },
      {
        "box": {
          "maxclass": "number",
          "id": "modulation_index",
          "patching_rect": [90, 70, 40, 20]
        }
      },
      {
        "box": {
          "maxclass": "number",
          "id": "modulation_freq",
          "patching_rect": [90, 130, 40, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "freq_add",
          "patching_rect": [170, 30, 70, 20]
        }
      },
      {
        "box": {
          "maxclass": "ezdac~",
          "id": "dac",
          "patching_rect": [250, 10, 35, 45]
        }
      }
    ],
    "connections": [
      {
        "source": ["modulator_osc", 0],
        "destination": ["modulator_scale", 0]
      },
      {
        "source": ["modulation_freq", 0],
        "destination": ["modulator_osc", 0]
      },
      {
        "source": ["modulation_index", 0],
        "destination": ["modulator_scale", 1]
      },
      {
        "source": ["modulator_scale", 0],
        "destination": ["freq_add", 1]
      },
      {
        "source": ["freq_add", 0],
        "destination": ["carrier_osc", 0]
      },
      {
        "source": ["carrier_osc", 0],
        "destination": ["dac", 0]
      },
      {
        "source": ["carrier_osc", 0],
        "destination": ["dac", 1]
      }
    ]
  }
}