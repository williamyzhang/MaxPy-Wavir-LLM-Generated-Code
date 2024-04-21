{
    "patcher": {
        "boxes": [
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "noise~",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [0, 0, 50, 20],
                    "id": "obj-noise"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 350 0.5",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outlettype": ["signal", "signal", "signal", "signal"],
                    "patching_rect": [100, 0, 50, 20],
                    "id": "obj-svf"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "gen~",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "patching_rect": [200, 0, 50, 20],
                    "id": "obj-gen"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "dac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [300, 0, 50, 20],
                    "id": "obj-dac"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": ["obj-noise", 0],
                    "destination": ["obj-svf", 0],
                    "id": "line1"
                }
            },
            {
                "patchline": {
                    "source": ["obj-svf", 0],
                    "destination": ["obj-gen", 0],
                    "id": "line2"
                }
            },
            {
                "patchline": {
                    "source": ["obj-gen", 0],
                    "destination": ["obj-dac", 0],
                    "id": "line3"
                }
            },
            {
                "patchline": {
                    "source": ["obj-gen", 0],
                    "destination": ["obj-dac", 1],
                    "id": "line3b"
                }
            }
        ]
    }
}