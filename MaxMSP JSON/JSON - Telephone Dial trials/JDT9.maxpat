{
  "patcher": {
    "boxes": [
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 350",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [50, 50, 50, 20],
          "id": "osc1"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [150, 50, 50, 20],
          "id": "osc2"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "+~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [100, 100, 50, 20],
          "id": "adder"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "*~ 0.5",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [100, 150, 50, 20],
          "id": "volume"
        }
      },
      {
        "box": {
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [100, 200, 50, 20],
          "id": "dac"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "osc1", 0 ],
          "destination": [ "adder", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "osc2", 0 ],
          "destination": [ "adder", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "adder", 0 ],
          "destination": [ "volume", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "volume", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "volume", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}