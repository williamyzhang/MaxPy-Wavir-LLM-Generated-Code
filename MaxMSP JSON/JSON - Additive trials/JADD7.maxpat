{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 640, 480],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "obj-1",
          "patching_rect": [38, 70, 72, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 880",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "obj-2",
          "patching_rect": [38, 120, 72, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1320",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "obj-3",
          "patching_rect": [38, 170, 72, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1760",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "obj-4",
          "patching_rect": [38, 220, 72, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 2200",
          "numinlets": 1,
          "numoutlets": 1,
          "id": "obj-5",
          "patching_rect": [38, 270, 72, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 2,
          "numoutlets": 1,
          "id": "obj-6",
          "patching_rect": [278, 70, 40, 20]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "id": "obj-7",
          "patching_rect": [278, 250, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "obj-1", 0 ],
          "destination": [ "obj-6", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj-2", 0 ],
          "destination": [ "obj-6", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj-3", 0 ],
          "destination": [ "obj-6", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj-4", 0 ],
          "destination": [ "obj-6", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj-5", 0 ],
          "destination": [ "obj-6", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj-6", 0 ],
          "destination": [ "obj-7", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "obj-6", 0 ],
          "destination": [ "obj-7", 1 ]
        }
      }
    ]
  }
}