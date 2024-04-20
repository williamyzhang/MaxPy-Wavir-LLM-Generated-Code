{
  "boxes": [
    {
      "box": {
        "id": "b1",
        "maxclass": "newobj",
        "text": "cycle~ 440",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [20, 20, 50, 20]
      }
    },
    {
      "box": {
        "id": "b2",
        "maxclass": "newobj",
        "text": "cycle~ 1",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [20, 60, 50, 20]
      }
    },
    {
      "box": {
        "id": "b3",
        "maxclass": "newobj",
        "text": "*~ 100",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [20, 100, 50, 20]
      }
    },
    {
      "box": {
        "id": "b4",
        "maxclass": "newobj",
        "text": "+~ 440",
        "numinlets": 2,
        "numoutlets": 1,
        "patching_rect": [20, 140, 50, 20]
      }
    },
    {
      "box": {
        "id": "b5",
        "maxclass": "newobj",
        "text": "cycle~",
        "numinlets": 1,
        "numoutlets": 1,
        "patching_rect": [20, 180, 50, 20]
      }
    },
    {
      "box": {
        "id": "b6",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [20, 240, 50, 20]
      }
    }
  ],

  "lines": [
    {
      "patchline": {
        "source": [ "b2", 0 ],
        "destination": [ "b3", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "b3", 0 ],
        "destination": [ "b4", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "b4", 0 ],
        "destination": [ "b5", 0 ]
      }
    },
    {
      "patchline": {
        "source": [ "b1", 0 ],
        "destination": [ "b4", 1 ]
      }
    },
    {
      "patchline": {
        "source": [ "b5", 0 ],
        "destination": [ "b6", 0 ]
      }
    }
  ]

}