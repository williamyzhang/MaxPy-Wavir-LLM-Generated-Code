{
  
    "boxes": [
    {
      "box": {
        "id": "phasor~",
        "maxclass": "newobj",
        "text": "phasor~ 200",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [100, 100, 50, 20]
      }
    },
    {
      "box": {
        "id": "cycle~1",
        "maxclass": "newobj",
        "text": "cycle~ 1000",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [100, 200, 50, 20]
      }
    },
    {
      "box": {
        "id": "cycle~2",
        "maxclass": "newobj",
        "text": "cycle~",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [100, 300, 50, 20]
      }
    },
    {
      "box": {
        "id": "times~",
        "maxclass": "newobj",
        "text": "*~ 100",
        "numinlets": 3,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [200, 200, 50, 20]
      }
    },
    {
      "box": {
        "id": "plus~",
        "maxclass": "newobj",
        "text": "+~ 200",
        "numinlets": 3,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [300, 300, 50, 20]
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
        "patching_rect": [400, 200, 50, 20]
      }
    }
  ],
  "patchlines": [
    {
      "source": [ "phasor~", 0 ],
      "destination": [ "cycle~2", 0 ]
    },
    {
      "source": [ "times~", 0 ],
      "destination": [ "plus~", 0 ]
    },
    {
      "source": [ "cycle~1", 0 ],
      "destination": [ "times~", 0 ]
    },
    {
      "source": [ "plus~", 0 ],
      "destination": [ "dac~", 0 ]
    },
    {
      "source": [ "plus~", 0 ],
      "destination": [ "dac~", 1 ]
    }
  ]

}