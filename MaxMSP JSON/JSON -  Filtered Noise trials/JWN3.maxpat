{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "noise~",
          "numinlets": 1,
          "numoutlets": 2,
          "patching_rect": [100, 100, 50, 20],
          "id": "noise"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "svf~ 1000 0.5 0",
          "numinlets": 3,
          "numoutlets": 2,
          "patching_rect": [100, 150, 100, 20],
          "id": "svf"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "gain~",
          "numinlets": 4,
          "numoutlets": 1,
          "patching_rect": [100, 250, 104, 20],
          "id": "gain"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "ezdac~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 300, 44, 20],
          "id": "ezdac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["noise", 0],
          "destination": ["svf", 0]
        }
      },
      {
        "patchline": {
          "source": ["svf", 0],
          "destination": ["gain", 0]
        }
      },
      {
        "patchline": {
          "source": ["gain", 0],
          "destination": ["ezdac", 0]
        }
      },
      {
        "patchline": {
          "source": ["gain", 0],
          "destination": ["ezdac", 1]
        }
      }
    ]
  }
}