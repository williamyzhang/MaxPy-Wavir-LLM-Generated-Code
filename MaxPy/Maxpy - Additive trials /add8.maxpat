{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 8,
      "minor": 1,
      "revision": 11,
      "architecture": "x64",
      "modernui": 1
    },
    "classnamespace": "box",
    "rect": [
      34.0,
      87.0,
      1372.0,
      779.0
    ],
    "bglocked": 0,
    "openinpresentation": 0,
    "default_fontsize": 12.0,
    "default_fontface": 0,
    "default_fontname": "Arial",
    "gridonopen": 1,
    "gridsize": [
      15.0,
      15.0
    ],
    "gridsnaponopen": 1,
    "objectsnaponopen": 1,
    "statusbarvisible": 2,
    "toolbarvisible": 1,
    "lefttoolbarpinned": 0,
    "toptoolbarpinned": 0,
    "righttoolbarpinned": 0,
    "bottomtoolbarpinned": 0,
    "toolbars_unpinned_last_save": 0,
    "tallnewobj": 0,
    "boxanimatetime": 200,
    "enablehscroll": 1,
    "enablevscroll": 1,
    "devicewidth": 0.0,
    "description": "",
    "digest": "",
    "tags": "",
    "style": "",
    "subpatcher_template": "",
    "assistshowspatchername": 0,
    "boxes": [
      {
        "box": {
          "id": "obj-1",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            180.0,
            100,
            43.0,
            22.0
          ],
          "text": "cycle~ 220"
        }
      },
      {
        "box": {
          "id": "obj-2",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            280.0,
            100,
            43.0,
            22.0
          ],
          "text": "cycle~ 440"
        }
      },
      {
        "box": {
          "id": "obj-3",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            380.0,
            100,
            43.0,
            22.0
          ],
          "text": "cycle~ 660"
        }
      },
      {
        "box": {
          "id": "obj-4",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            480.0,
            100,
            43.0,
            22.0
          ],
          "text": "cycle~ 880"
        }
      },
      {
        "box": {
          "id": "obj-5",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            580.0,
            100,
            43.0,
            22.0
          ],
          "text": "cycle~ 1100"
        }
      },
      {
        "box": {
          "id": "obj-6",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            180.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~ 0.2"
        }
      },
      {
        "box": {
          "id": "obj-7",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            260.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~ 0.2"
        }
      },
      {
        "box": {
          "id": "obj-8",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            340.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~ 0.2"
        }
      },
      {
        "box": {
          "id": "obj-9",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            420.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~ 0.2"
        }
      },
      {
        "box": {
          "id": "obj-10",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            500.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~ 0.2"
        }
      },
      {
        "box": {
          "id": "obj-11",
          "maxclass": "ezdac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            180.0,
            400,
            45.0,
            45.0
          ],
          "text": "ezdac~"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "source": [
            "obj-1",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-7",
            0
          ],
          "source": [
            "obj-2",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-8",
            0
          ],
          "source": [
            "obj-3",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-9",
            0
          ],
          "source": [
            "obj-4",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-10",
            0
          ],
          "source": [
            "obj-5",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            0
          ],
          "source": [
            "obj-6",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            1
          ],
          "source": [
            "obj-6",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            0
          ],
          "source": [
            "obj-7",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            1
          ],
          "source": [
            "obj-7",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            0
          ],
          "source": [
            "obj-8",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            1
          ],
          "source": [
            "obj-8",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            0
          ],
          "source": [
            "obj-9",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            1
          ],
          "source": [
            "obj-9",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            0
          ],
          "source": [
            "obj-10",
            0
          ],
          "midpoints": [
            null
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            1
          ],
          "source": [
            "obj-10",
            0
          ],
          "midpoints": [
            null
          ]
        }
      }
    ],
    "dependency_cache": [],
    "autosave": 0
  }
}