{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 800, 600],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 600",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "id": "oscillator",
          "patching_rect": [100, 100, 44, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1.2",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "id": "modulator",
          "patching_rect": [100, 150, 44, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 100",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "id": "modulation_amount",
          "patching_rect": [100, 200, 44, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~ 600",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "id": "modulation_sum",
          "patching_rect": [150, 250, 44, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "id": "amplitude",
          "patching_rect": [200, 300, 44, 22]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "adsr 2000 500 0.5 3000",
          "numinlets": 5,
          "numoutlets": 1,
          "outlettype": ["signal"],
          "id": "envelope",
          "patching_rect": [250, 350, 110, 22]
        }
      }
    ],
    "patchlines": [
      {
        "source": ["modulator", 0],
        "destination": ["modulation_amount", 0]
      },
      {
        "source": ["modulation_amount", 0],
        "destination": ["modulation_sum", 1]
      },
      {
        "source": ["modulation_sum", 0],
        "destination": ["oscillator", 0]
      },
      {
        "source": ["oscillator", 0],
        "destination": ["amplitude", 0]
      },
      {
        "source": ["envelope", 0],
        "destination": ["amplitude", 1]
      }
    ]
  }
}