{
    "patcher": {
        "boxes": [
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "noise~",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "id": "noise",
                    "patching_rect": [10, 10, 50, 20]
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 1000 1 ",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "id": "lowpass",
                    "patching_rect": [10, 50, 100, 20]
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "ezdac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "id": "dac",
                    "patching_rect": [10, 150, 50, 20]
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": [ "noise", 0 ],
                    "destination": [ "lowpass", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "lowpass", 0 ],
                    "destination": [ "dac", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "lowpass", 0 ],
                    "destination": [ "dac", 1 ]
                }
            }
        ]
    }
}