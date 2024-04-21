{
    "patcher":{
    "boxes": [
      {
        "box": {
          "id": "oscillator",
          "maxclass": "newobj",
          "text": "cycle~",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [10, 10, 50, 20]
        }
      },
      {
        "box": {
          "id": "lfo",
          "maxclass": "newobj",
          "text": "cycle~ 5",
          "numinlets": 1,
          "numoutlets": 1,
          "patching_rect": [10, 60, 50, 20]
        }
      },
      {
        "box": {
          "id": "times",
          "maxclass": "newobj",
          "text": "*~ 10",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [10, 110, 30, 20]
        }
      },
      {
        "box": {
          "id": "plus",
          "maxclass": "newobj",
          "text": "+~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [10, 160, 30, 20]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 2,
          "patching_rect": [10, 210, 40, 20]
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "source": [ "lfo", 0 ],
          "destination": [ "times", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "times", 0 ],
          "destination": [ "plus", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "plus", 0 ],
          "destination": [ "oscillator", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "oscillator", 0 ],
          "destination": [ "dac", 0 ]
        }
      },
      {
        "patchline": {
          "source": [ "oscillator", 0 ],
          "destination": [ "dac", 1 ]
        }
      }
    ]
  }
}