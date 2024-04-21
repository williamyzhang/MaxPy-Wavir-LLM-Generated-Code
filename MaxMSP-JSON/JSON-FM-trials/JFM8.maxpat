{
    "patcher": {
      "fileversion": 1,
      "rect": [0, 0, 550, 400],
      "boxes": [
        {
          "box": {
            "maxclass": "newobj",
            "text": "cycle~ 440",
            "numinlets": 2,
            "numoutlets": 2,
            "id": "modulator",
            "patching_rect": [50, 50, 50, 20]
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "cycle~",
            "numinlets": 2,
            "numoutlets": 2,
            "id": "carrier",
            "patching_rect": [50, 150, 50, 20]
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "+ 440",
            "numinlets": 2,
            "numoutlets": 1,
            "id": "freq_shift",
            "patching_rect": [200, 100, 30, 20]
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "*~ 500",
            "numinlets": 2,
            "numoutlets": 1,
            "id": "freq_modulation",
            "patching_rect": [200, 200, 40, 20]
          }
        },
        {
          "box": {
            "maxclass": "newobj",
            "text": "dac~",
            "numinlets": 2,
            "numoutlets": 0,
            "id": "audio_output",
            "patching_rect": [350, 275, 40, 20]
          }
        }
      ],
      "lines": [
        {
          "patchline": {
            "source": [ "modulator", 0 ],
            "destination": [ "freq_modulation", 0 ]
          }
        },
        {
          "patchline": {
            "source": [ "freq_modulation", 0 ],
            "destination": [ "freq_shift", 1 ]
          }
        },
        {
          "patchline": {
            "source": [ "freq_shift", 0 ],
            "destination": [ "carrier", 0 ]
          }
        },
        {
          "patchline": {
            "source": [ "carrier", 0 ],
            "destination": [ "audio_output", 0 ]
          }
        },
        {
          "patchline": {
            "source": [ "carrier", 0 ],
            "destination": [ "audio_output", 1 ]
          }
        }
      ]
    }
  }