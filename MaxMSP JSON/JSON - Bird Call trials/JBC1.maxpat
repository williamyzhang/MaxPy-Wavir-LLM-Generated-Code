{
    "patcher": {
        "boxes": [
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "noise~",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [50, 50, 50, 20],
                    "id": "noise1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 3300 0.2",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outlettype": ["signal", "signal", "signal", "signal"],
                    "patching_rect": [50, 110, 50, 20],
                    "id": "svf1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "cycle~ 5",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [150, 50, 50, 20],
                    "id": "cycle1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "scope~",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [50, 180, 80, 70],
                    "id": "scope1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "dac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [50, 270, 50, 20],
                    "id": "dac1"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": [ "noise1", 0 ],
                    "destination": [ "svf1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "svf1", 2 ],
                    "destination": [ "scope1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "cycle1", 0 ],
                    "destination": [ "svf1", 1 ]
                }
            },
            {
                "patchline": {
                    "source": [ "scope1", 0 ],
                    "destination": [ "dac1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "scope1", 0 ],
                    "destination": [ "dac1", 1 ]
                }
            }
        ]
    }
}