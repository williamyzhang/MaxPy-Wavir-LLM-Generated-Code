{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 400],
    "bglocked": 0,
    "openinpresentation": 0,
    "defrect": [0, 0, 550, 400],
    "mode": 0,
    "fontname": "Arial",
    "fontsize": 12,
    "fontface": 0,
    "gridsize": [15, 15],
    "gridonopen": 0,
    "onlock": 0,
    "enablehscroll": 1,
    "enablevscroll": 1,
    "devicewidth": 0,
    "deviceheight": 0,
    "devicesizemode": 0,
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "fontsize": 12,
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 100, 20],
          "id": "carrier_osc"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "fontsize": 12,
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 150, 100, 20],
          "id": "modulator_osc"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "fontsize": 12,
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 250, 40, 20],
          "id": "modulation_index"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "fontsize": 12,
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 200, 30, 20],
          "id": "amplitude_modulator"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "fontsize": 12,
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [350, 250, 40, 20],
          "id": "audio_output"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "modulator_osc", 0 ],
          "destination": [ "modulation_index", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "modulation_index", 0 ],
          "destination": [ "amplitude_modulator", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "carrier_osc", 0 ],
          "destination": [ "amplitude_modulator", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "amplitude_modulator", 0 ],
          "destination": [ "audio_output", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "amplitude_modulator", 0 ],
          "destination": [ "audio_output", 1 ]
        }
      }
    ]
  }
}