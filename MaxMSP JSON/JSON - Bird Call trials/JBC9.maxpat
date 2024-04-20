{
  "patcher": {
    "boxes": [
      {
        "box": {
          "id": "obj-1",
          "maxclass": "newobj",
          "text": "cycle~ 1000",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [0, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "obj-2",
          "maxclass": "newobj",
          "text": "cycle~ 1200",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "obj-3",
          "maxclass": "newobj",
          "text": "cycle~ 800",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [200, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "obj-4",
          "maxclass": "newobj",
          "text": "svf~ 5000 0.5",
          "numinlets": 3,
          "numoutlets": 4,
          "patching_rect": [150, 150, 144, 23]
        }
      },
      {
        "box": {
          "id": "obj-5",
          "maxclass": "newobj",
          "text": "*~ 0.1",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [250, 250, 50, 20]
        }
      },
      {
        "box": {
          "id": "obj-6",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [400, 350, 50, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["obj-1", 0],
          "destination": ["obj-4", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj-2", 0],
          "destination": ["obj-4", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj-3", 0],
          "destination": ["obj-4", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj-4", 1],
          "destination": ["obj-5", 0]
        }
      },
      {
        "patchline": {
          "source": ["obj-5", 0],
          "destination": ["obj-6", 0]
        }
      }
    ]
  }
}