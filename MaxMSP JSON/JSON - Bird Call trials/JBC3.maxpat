{
  "patcher": {
    "fileversion": 1,
    "rect": [10, 10, 600, 400],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 50, 50, 20],
          "id": "oscillator"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "adsr~ 100 200 0.5 300",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 150, 100, 20],
          "id": "envelope_generator"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "line~",
          "numinlets": 3,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20],
          "id": "frequency_modulator"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 250, 30, 20],
          "id": "amplitude_modulator"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [200, 300, 50, 20],
          "id": "audio_output"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "oscillator", 0 ],
          "destination": [ "amplitude_modulator", 0 ],
          "hidden": 0,
          "midpoints": []
        }
      },
      {
        "patchline": {
          "source": [ "envelope_generator", 0 ],
          "destination": [ "amplitude_modulator", 1 ],
          "hidden": 0,
          "midpoints": []
        }
      },
      {
        "patchline": {
          "source": [ "frequency_modulator", 0 ],
          "destination": [ "oscillator", 0 ],
          "hidden": 0,
          "midpoints": []
        }
      },
      {
        "patchline": {
          "source": [ "amplitude_modulator", 0 ],
          "destination": [ "audio_output", 0 ],
          "hidden": 0,
          "midpoints": []
        }
      }
    ]
  }
}