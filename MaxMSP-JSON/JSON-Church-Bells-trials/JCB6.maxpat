{
    "patcher": {
        "fileversion": 1,
        "rect": [0, 0, 550, 400],
        "bglocked": 0,
        "defrect": [0, 0, 550, 400],
        "openinpresentation": 0,
        "boxes": [
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "phasor~ 0.2",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [150, 50, 60, 20],
                    "id": "phasor1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "cycle~ 50",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [150, 100, 50, 20],
                    "id": "cycle1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "multiply~ 500",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "patching_rect": [150, 150, 60, 20],
                    "id": "mult1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 400 0.2",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "patching_rect": [150, 200, 144, 23],
                    "id": "svf1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "gen~ reverb",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [150, 300, 60, 20],
                    "id": "reverb1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "dac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [150, 350, 50, 20],
                    "id": "dac1"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": ["phasor1", 0],
                    "destination": ["cycle1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["cycle1", 0],
                    "destination": ["mult1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["mult1", 0],
                    "destination": ["svf1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["svf1", 2],  
                    "destination": ["reverb1", 0]
                }
            },
            {
                "patchline": {
                    "source": ["reverb1", 0],
                    "destination": ["dac1", 0]
                },
                "patchline": {
                    "source": ["reverb1", 0],
                    "destination": ["dac1", 1]
                }
            }
        ]
    }
}