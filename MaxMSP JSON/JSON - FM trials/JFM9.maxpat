{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 300],
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "id": "carrier",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [40, 40, 45, 20],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "flonum",
          "id": "fm_index",
          "patching_rect": [250, 40, 45, 20],
          "outlettype": ["float"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 1",
          "id": "modulator",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [40, 100, 45, 20],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "id": "m_index_control",
          "numinlets": 2,
          "patching_rect": [250, 100, 45, 20],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~ 440",
          "id": "frequency_mod",
          "numinlets": 2,
          "patching_rect": [250, 160, 45, 20],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~",
          "id": "amplitude_control",
          "numinlets": 2,
          "patching_rect": [150, 220, 45, 20],
          "outlettype": ["signal"]
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "id": "output",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [150, 260, 45, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": ["fm_index", 0],
          "destination": ["m_index_control", 1]
        }
      },
      {
        "patchline": {
          "source": ["modulator", 0],
          "destination": ["m_index_control", 0]
        }
      },
      {
        "patchline": {
          "source": ["m_index_control", 0],
          "destination": ["frequency_mod", 0]
        }
      },
      {
        "patchline": {
          "source": ["frequency_mod", 0],
          "destination": ["amplitude_control", 0]
        }
      },
      {
        "patchline": {
          "source": ["carrier", 0],
          "destination": ["amplitude_control", 0]
        }
      },
      {
        "patchline": {
          "source": ["amplitude_control", 0],
          "destination": ["output", 0]
        }
      }
    ]
  }
}