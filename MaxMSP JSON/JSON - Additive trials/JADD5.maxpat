{ "patcher": { "fileversion": 1, "rect": [0, 0, 640, 480], "boxes": [ { "box": { "id": "b1", "maxclass": "newobj", "text": "cycle~ 440", "numinlets": 1, "numoutlets": 1, "outlettype": ["signal"], "patching_rect": [50, 50, 50, 20] } }, { "box": { "id": "b2", "maxclass": "newobj", "text": "cycle~ 880", "numinlets": 1, "numoutlets": 1, "outlettype": ["signal"], "patching_rect": [50, 100, 50, 20] } }, { "box": { "id": "b3", "maxclass": "newobj", "text": "cycle~ 1320", "numinlets": 1, "numoutlets": 1, "outlettype": ["signal"], "patching_rect": [50, 150, 50, 20] } }, { "box": { "id": "b4", "maxclass": "newobj", "text": "cycle~ 1760", "numinlets": 1, "numoutlets": 1, "outlettype": ["signal"], "patching_rect": [50, 200, 50, 20] } }, { "box": { "id": "b5", "maxclass": "newobj", "text": "cycle~ 2200", "numinlets": 1, "numoutlets": 1, "outlettype": ["signal"], "patching_rect": [50, 250, 50, 20] } }, { "box": { "id": "b6", "maxclass": "newobj", "text": "+~", "numinlets": 2, "numoutlets": 1, "outlettype": ["signal"], "patching_rect": [200, 150, 30, 20] } }, { "box": { "id": "b7", "maxclass": "newobj", "text": "dac~", "numinlets": 2, "numoutlets": 0, "patching_rect": [350, 150, 50, 20] } } ], "lines": [ { "patchline": { "source": ["b1", 0], "destination": ["b6", 0] } }, { "patchline": { "source": ["b2", 0], "destination": ["b6", 1] } }, { "patchline": { "source": ["b6", 0], "destination": ["b7", 0] } }, { "patchline": { "source": ["b3", 0], "destination": ["b6", 1] } }, { "patchline": { "source": ["b4", 0], "destination": ["b6", 1] } }, { "patchline": { "source": ["b5", 0], "destination": ["b6", 1] } } ] } }