{ 
  "boxes": [
    {
      "box": {
        "id": "phasor~",
        "maxclass": "newobj",
        "text": "phasor~ 0.5",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [100, 100, 66, 22]
      }
    },
    {
      "box": {
        "id": "cycle~",
        "maxclass": "newobj",
        "text": "cycle~ 440",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [100, 200, 66, 22]
      }
    },
    {
      "box": {
        "id": "times~",
        "maxclass": "newobj",
        "text": "*~ 10",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [150, 150, 46, 22]
      }
    },
    {
      "box": {
        "id": "plus~",
        "maxclass": "newobj",
        "text": "+~ 440",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [200, 150, 50, 22]
      }
    },
    {
      "box": {
        "id": "dac~",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "outlettype": [],
        "patching_rect": [250, 300, 40, 22]
      }
    }
  ],
  "connections": [
    {
      "src": "phasor~",
      "dst": "times~",
      "inlet": 0,
      "outlet": 0
    },
    {
      "src": "times~",
      "dst": "plus~",
      "inlet": 0,
      "outlet": 0
    },
    {
      "src": "plus~",
      "dst": "cycle~",
      "inlet": 1,
      "outlet": 0
    },
    {
      "src": "cycle~",
      "dst": "dac~",
      "inlet": 0,
      "outlet": 0
    }
  ]

}