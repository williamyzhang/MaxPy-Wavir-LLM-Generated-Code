{
    "patcher": {
        "boxes": [
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "cycle~ 800",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [50, 150, 50, 20],
                    "id": "osc1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "cycle~ 1600",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [50, 200, 50, 20],
                    "id": "osc2"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "svf~ 2500 0.2",
                    "numinlets": 3,
                    "numoutlets": 4,
                    "patching_rect": [150, 150, 100, 20],
                    "id": "filter1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "*~ 0.1",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "patching_rect": [250, 150, 30, 20],
                    "id": "volume1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "ezdac~",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [350, 150, 45, 20],
                    "id": "dac1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "line~",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "patching_rect": [200, 100, 50, 20],
                    "id": "line1"
                }
            },
            {
                "box": {
                    "maxclass": "newobj",
                    "text": "metro 800",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "patching_rect": [100, 100, 50, 20],
                    "id": "metro1"
                }
            },
            {
                "box": {
                    "maxclass": "message",
                    "text": "1, 0 500",
                    "patching_rect": [100, 50, 50, 20],
                    "id": "message1"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "source": [ "metro1", 0 ],
                    "destination": [ "message1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "message1", 0 ],
                    "destination": [ "line1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "line1", 0 ],
                    "destination": [ "volume1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "osc1", 0 ],
                    "destination": [ "filter1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "osc2", 0 ],
                    "destination": [ "filter1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "filter1", 2 ],
                    "destination": [ "volume1", 1 ]
                }
            },
            {
                "patchline": {
                    "source": [ "volume1", 0 ],
                    "destination": [ "dac1", 0 ]
                }
            },
            {
                "patchline": {
                    "source": [ "volume1", 0 ],
                    "destination": [ "dac1", 1 ]
                }
            }
        ]
    }
}