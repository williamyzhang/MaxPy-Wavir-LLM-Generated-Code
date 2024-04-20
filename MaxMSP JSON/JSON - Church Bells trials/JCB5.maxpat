{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 500, 400],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 110.0",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 75, 60, 20],
          "id": "bell_tone"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 0.2",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 125, 50, 20],
          "id": "low_freq_mod"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 25",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 175, 40, 20],
          "id": "mod_amount"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~ 110",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [50, 225, 40, 20],
          "id": "freq_mixer"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gen~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 275, 40, 20],
          "id": "reverb_effect"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [50, 325, 40, 20],
          "id": "audio_output"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["low_freq_mod", 0],
          "destination": ["mod_amount", 0]
        }
      },
      {
        "patchline": {
          "source": ["mod_amount", 0],
          "destination": ["freq_mixer", 1]
        }
      },
      {
        "patchline": {
          "source": ["freq_mixer", 0],
          "destination": ["reverb_effect", 0]
        }
      },
      {
        "patchline": {
          "source": ["bell_tone", 0],
          "destination": ["mod_amount", 1]
        }
      },
      {
        "patchline": {
          "source": ["freq_mixer", 0],
          "destination": ["reverb_effect", 0]
        }
      },
      {
        "patchline": {
          "source": ["reverb_effect", 0],
          "destination": ["dac~", 0]
        }
      },
      {
        "patchline": {
          "source": ["reverb_effect", 0],
          "destination": ["dac~", 1]
        }
      }
    ]
  }
}