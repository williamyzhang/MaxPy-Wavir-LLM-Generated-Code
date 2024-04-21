{
  "patcher": {
    "fileversion": 1,
    "rect": [0, 0, 550, 300],
    "boxes": [
      {
        "box": {
          "rect": [20, 100, 40, 60],
          "id": "carrier_osc",
          "maxclass": "newobj",
          "text": "cycle~ 440"
        }
      },
      {
        "box": {
          "rect": [20, 170, 40, 60],
          "id": "mod_osc",
          "maxclass": "newobj",
          "text": "cycle~ 10"
        }
      },
      {
        "box": {
          "rect": [100, 135, 30, 60],
          "id": "multiplier",
          "maxclass": "newobj",
          "text": "*~ 1"
        }
      },
      {
        "box": {
          "rect": [170, 135, 30, 60],
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "mod_osc", 0 ],
          "destination": [ "multiplier", 1 ]
        }
      },
      {
        "patchline": {
          "source": [ "carrier_osc", 0 ],
          "destination": [ "multiplier", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "multiplier", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "multiplier", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}