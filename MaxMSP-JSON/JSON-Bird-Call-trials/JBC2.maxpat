{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1000",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [112, 100, 50, 20],
          "id": "oscillator1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1200",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [112, 150, 50, 20],
          "id": "oscillator2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 800",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [112, 200, 50, 20],
          "id": "oscillator3"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 2500 0.7",
          "numinlets": 3,
          "numoutlets": 4,
          "patching_rect": [250, 100, 144, 23],
          "id": "filter"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.2",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [400, 100, 50, 20],
          "id": "volume_control"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "ezdac~",
          "numinlets": 2,
          "numoutlets": 2,
          "patching_rect": [550, 100, 50, 20],
          "id": "audio_output"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["oscillator1", 0],
          "destination": ["filter", 0]
        }
      },
      {
        "patchline": {
          "source": ["oscillator2", 0],
          "destination": ["filter", 0]
        }
      },
      {
        "patchline": {
          "source": ["oscillator3", 0],
          "destination": ["filter", 0]
        }
      },
      {
        "patchline": {
          "source": ["filter", 0],
          "destination": ["volume_control", 0]
        }
      },
      {
        "patchline": {
          "source": ["volume_control", 0],
          "destination": ["audio_output", 0]
        }
      },
      {
        "patchline": {
          "source": ["volume_control", 0],
          "destination": ["audio_output", 1]
        }
      }
    ]
  }
}