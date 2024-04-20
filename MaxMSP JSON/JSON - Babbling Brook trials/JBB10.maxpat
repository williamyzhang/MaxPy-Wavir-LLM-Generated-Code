{
    "patcher": {
        "boxes": [
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "cycle~ 440",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [50, 50, 50, 20],
                    "id": "cycle1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 797. 0.5",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "outlettype": ["signal", "signal", "signal", "signal"],
                    "patching_rect": [36.0, 292.0, 144.0, 23.0],
                    "id": "obj-59"
                }
            },
            {
                "box": {
                    "maxclass": "gen~",
                    "text": "gen~ reverb",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [120, 150, 50, 20],
                    "id": "gen1"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": [ "cycle1", 0 ],
                    "destination": [ "obj-59", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "obj-59", 1 ],
                    "destination": [ "gen1", 0 ]
                }
            }
        ]
    }
}