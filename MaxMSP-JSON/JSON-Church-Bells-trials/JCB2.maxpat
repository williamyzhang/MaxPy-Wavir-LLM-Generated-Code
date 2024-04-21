{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20],
          "id": "oscillator"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "adsr~ 500 200 0.5 1000",
          "numinlets": 4,
          "numoutlets": 1,
          "patching_rect": [100, 150, 120, 20],
          "id": "envelope"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "reverb~",
          "numinlets": 2,
          "numoutlets": 2,
          "patching_rect": [100, 250, 50, 20],
          "id": "reverb"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gain~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 300, 50, 20],
          "id": "gain"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 350, 50, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["oscillator", 0],
          "destination": ["envelope", 0]
        }
      },
      {
        "patchline": {
          "source": ["envelope", 0],
          "destination": ["reverb", 0]
        }
      },
      {
        "patchline": {
          "source": ["reverb", 0],
          "destination": ["gain", 0]
        }
      },
      {
        "patchline": {
          "source": ["gain", 0],
          "destination": ["dac", 0]
        }
      },
      {
        "patchline": {
          "source": ["gain", 0],
          "destination": ["dac", 1]
        }
      }
    ],
    "comments": []
  }
}