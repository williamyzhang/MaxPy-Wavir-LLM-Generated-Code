{
    "patcher": {
        "boxes": [
            {
                "box": {
                    "id": "obj-1",
                    "maxclass": "newobj",
                    "text": "noise~",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [100, 50, 50, 20]
                }
            },
            {
                "box": {
                    "id": "obj-2",
                    "maxclass": "newobj",
                    "text": "svf~ 200 0.5",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outlettype": ["signal", "signal", "signal", "signal"],
                    "patching_rect": [100, 100, 60, 20]
                }
            },
            {
                "box": {
                    "id": "obj-3",
                    "maxclass": "newobj",
                    "text": "line~",
                    "numinlets": 3,
                    "numoutlets": 1,
                    "patching_rect": [100, 150, 44, 20]
                }
            },
            {
                "box": {
                    "id": "obj-4",
                    "maxclass": "newobj",
                    "text": "mix~",
                    "numinlets": 3,
                    "numoutlets": 1,
                    "patching_rect": [280, 100, 42, 20]
                }
            },
            {
                "box": {
                    "id": "obj-5",
                    "maxclass": "newobj",
                    "text": "dac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [280, 150, 42, 20]
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": [ "obj-1", 0 ],
                    "destination": [ "obj-2", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "obj-2", 2 ],
                    "destination": [ "obj-4", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "obj-3", 0 ],
                    "destination": [ "obj-4", 1 ]
                }
            },
            {
                "patchline": {
                    "source": [ "obj-4", 0 ],
                    "destination": [ "obj-5", 0 ]
                }
            }
        ]
    }
}