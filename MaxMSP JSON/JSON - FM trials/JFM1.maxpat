{
  "patcher": {
    "boxes": [
      {
        "box": {
          "id": "oscillator1",
          "maxclass": "newobj",
          "text": "cycle~ 440",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [10, 10, 50, 20]
        }
      },
      {
        "box": {
          "id": "oscillator2",
          "maxclass": "newobj",
          "text": "cycle~ 200",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [10, 50, 50, 20]
        }
      },
      {
        "box": {
          "id": "multiplication",
          "maxclass": "newobj",
          "text": "*~ 100",
          "numinlets": 2,
          "numoutlets": 1,
          "patching_rect": [10, 90, 50, 20]
        }
      },
      {
        "box": {
          "id": "dac",
          "maxclass": "newobj",
          "text": "dac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [10, 130, 50, 20]
        }
      }
    ],
    "patchlines": [
      {
        "source": [ "oscillator2", 0 ],
        "destination": [ "multiplication", 0 ]
      },
      {
        "source": [ "multiplication", 0 ],
        "destination": [ "oscillator1", 1 ]
      },
      {
        "source": [ "oscillator1", 0 ],
        "destination": [ "dac", 0 ]
      },
      {
        "source": [ "oscillator1", 0 ],
        "destination": [ "dac", 1 ]
      }
    ]
  }
}