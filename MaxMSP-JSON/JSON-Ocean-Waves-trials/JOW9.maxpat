{
    "patcher": {
        "boxes": [
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "noise~",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [100, 100, 50, 20],
                    "id": "noise1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 150 0.5",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outlettype": ["signal", "signal", "signal", "signal"],
                    "patching_rect": [100, 150, 80, 20],
                    "id": "svf1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 90 0.7",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outlettype": ["signal", "signal", "signal", "signal"],
                    "patching_rect": [100, 200, 80, 20],
                    "id": "svf2"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "line~",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "patching_rect": [200, 250, 40, 20],
                    "id": "ramp1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "cycle~ 0.1",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [200, 300, 60, 20],
                    "id": "lfo1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "*~ 800",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "patching_rect": [300, 350, 40, 20],
                    "id": "amp1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "dac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [400, 400, 40, 20],
                    "id": "output1"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": ["noise1", 0],
                    "destination": ["svf1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["svf1", 2],
                    "destination": ["svf2", 0]
                }
            },
            {
                "patchline": {
                    "source": ["svf2", 3],
                    "destination": ["amp1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["ramp1", 0],
                    "destination": ["amp1", 1]
                }
            },
            {
                "patchline": {
                    "source": ["lfo1", 0],
                    "destination": ["ramp1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["amp1", 0],
                    "destination": ["output1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["amp1", 0],
                    "destination": ["output1", 1]
                }
            }
        ]
    }
}