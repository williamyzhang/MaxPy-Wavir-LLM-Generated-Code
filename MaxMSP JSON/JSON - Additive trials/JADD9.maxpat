{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "bglocked": 0,
    "defrect": [0, 0, 800, 600],
    "openinpresentation": 0,
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20],
          "id": "cycle1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 100, 50, 20],
          "id": "cycle2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 150, 50, 20],
          "id": "cycle3"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 200, 50, 20],
          "id": "cycle4"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 2200",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 250, 50, 20],
          "id": "cycle5"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [200, 150, 30, 20],
          "id": "plus1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [260, 150, 30, 20],
          "id": "plus2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [320, 150, 30, 20],
          "id": "plus3"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [380, 150, 30, 20],
          "id": "dac1"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "cycle1", 0 ],
          "destination": [ "plus1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "cycle2", 0 ],
          "destination": [ "plus1", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "plus1", 0 ],
          "destination": [ "plus2", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "cycle3", 0 ],
          "destination": [ "plus2", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "plus2", 0 ],
          "destination": [ "plus3", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "cycle4", 0 ],
          "destination": [ "plus3", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "plus3", 0 ],
          "destination": [ "dac1", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "cycle5", 0 ],
          "destination": [ "dac1", 1 ]
        }
      }
    ]
  }
}