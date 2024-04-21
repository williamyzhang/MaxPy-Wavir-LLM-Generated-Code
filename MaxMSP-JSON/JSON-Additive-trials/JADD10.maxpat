{
  "boxes": [
    {
      "box": {
        "id": "sine_wave",
        "maxclass": "newobj",
        "text": "cycle~ 440",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [100, 100, 45, 20]
      }
    },
    {
      "box": {
        "id": "partial_1",
        "maxclass": "newobj",
        "text": "*~ 0.8",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [250, 150, 45, 20]
      }
    },
    {
      "box": {
        "id": "sine_wave1",
        "maxclass": "newobj",
        "text": "cycle~ 880",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [250, 100, 45, 20]
      }
    },
    {
      "box": {
        "id": "partial_2",
        "maxclass": "newobj",
        "text": "*~ 0.6",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [400, 220, 45, 20]
      }
    },
    {
      "box": {
        "id": "sine_wave2",
        "maxclass": "newobj",
        "text": "cycle~ 1320",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [400, 170, 45, 20]
      }
    },
    {
      "box": {
        "id": "partial_3",
        "maxclass": "newobj",
        "text": "*~ 0.4",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [550, 290, 45, 20]
      }
    },
    {
      "box": {
        "id": "sine_wave3",
        "maxclass": "newobj",
        "text": "cycle~ 1760",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [550, 240, 45, 20]
      }
    },
    {
      "box": {
        "id": "partial_4",
        "maxclass": "newobj",
        "text": "*~ 0.2",
        "numinlets": 2,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [700, 360, 45, 20]
      }
    },
    {
      "box": {
        "id": "sine_wave4",
        "maxclass": "newobj",
        "text": "cycle~ 2200",
        "numinlets": 1,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [700, 310, 45, 20]
      }
    },
    {
      "box": {
        "id": "mixer",
        "maxclass": "newobj",
        "text": "+~",
        "numinlets": 4,
        "numoutlets": 1,
        "outlettype": ["signal"],
        "patching_rect": [850, 450, 35, 20]
      }
    },
    {
      "box": {
        "id": "dac",
        "maxclass": "newobj",
        "text": "dac~",
        "numinlets": 2,
        "numoutlets": 0,
        "patching_rect": [1000, 500, 45, 20]
      }
    }
  ],
  "lines": [
    {
      "patchline": {
        "source": ["sine_wave1", 0],
        "destination": ["partial_1", 0]
      }
    },
    {
      "patchline": {
        "source": ["sine_wave2", 0],
        "destination": ["partial_2", 0]
      }
    },
    {
      "patchline": {
        "source": ["sine_wave3", 0],
        "destination": ["partial_3", 0]
      }
    },
    {
      "patchline": {
        "source": ["sine_wave4", 0],
        "destination": ["partial_4", 0]
      }
    },
    {
      "patchline": {
        "source": ["partial_1", 0],
        "destination": ["mixer", 0]
      }
    },
    {
      "patchline": {
        "source": ["partial_2", 0],
        "destination": ["mixer", 1]
      }
    },
    {
      "patchline": {
        "source": ["partial_3", 0],
        "destination": ["mixer", 2]
      }
    },
    {
      "patchline": {
        "source": ["partial_4", 0],
        "destination": ["mixer", 3]
      }
    },
    {
      "patchline": {
        "source": ["mixer", 0],
        "destination": ["dac", 0]
      }
    }
  ]
}