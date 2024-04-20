{
    "boxes": [
    {
      "box": {
        "id": "noise_generator",
        "maxclass": "newobj",
        "text": "noise~",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [0, 0, 45, 22]
      }
    },
    {
      "box": {
        "id": "lowpass_filter",
        "maxclass": "newobj",
        "text": "svf~ 1000 1 0",
        "numinlets": 4,
        "numoutlets": 1,
        "patching_rect": [0, 50, 120, 22],
        "description": "Lowpass filter: frequency 1000 Hz, Q factor 1, no gain adjustment."
      }
    },
    {
      "box": {
        "id": "dac",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [0, 100, 50, 22],
        "description": "Audio output."
      }
    }
  ],
  "patchlines": [
    {
      "source": [ "noise_generator", 0 ],
      "destination": [ "lowpass_filter", 0 ]
    },
    {
      "source": [ "lowpass_filter", 0 ],
      "destination": [ "dac", 0 ]
    },
    {
      "source": [ "lowpass_filter", 0 ],
      "destination": [ "dac", 1 ]
    }
  ]

}