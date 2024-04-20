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
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            80.0,
            100,
            38.0,
            22.0
          ],
          "text": "pink~"
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
            80.0,
            200,
            43.0,
            22.0
          ],
          "text": "cycle~ 0.1"
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
            80.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "fontface": 0,
          "id": "obj-4",
          "linmarkers": [
            0.0,
            11025.0,
            16537.5
          ],
          "logmarkers": [
            0.0,
            100.0,
            1000.0,
            10000.0
          ],
          "maxclass": "filtergraph~",
          "nfilters": 1,
          "numinlets": 8,
          "numoutlets": 7,
          "outlettype": [
            "list",
            "float",
            "float",
            "float",
            "float",
            "list",
            "int"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            80.0,
            400,
            256.0,
            128.0
          ],
          "setfilter": [
            0,
            5,
            1,
            0,
            0,
            40.0,
            1.0,
            2.5,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ],
          "text": "filtergraph~ 500"
        }
      },
      {
        "box": {
          "id": "obj-5",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            230.0,
            100,
            38.0,
            22.0
          ],
          "text": "pink~"
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
            230.0,
            200,
            43.0,
            22.0
          ],
          "text": "cycle~ 0.12000000000000001"
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
            230.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "fontface": 0,
          "id": "obj-8",
          "linmarkers": [
            0.0,
            11025.0,
            16537.5
          ],
          "logmarkers": [
            0.0,
            100.0,
            1000.0,
            10000.0
          ],
          "maxclass": "filtergraph~",
          "nfilters": 1,
          "numinlets": 8,
          "numoutlets": 7,
          "outlettype": [
            "list",
            "float",
            "float",
            "float",
            "float",
            "list",
            "int"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            230.0,
            400,
            256.0,
            128.0
          ],
          "setfilter": [
            0,
            5,
            1,
            0,
            0,
            40.0,
            1.0,
            2.5,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ],
          "text": "filtergraph~ 500"
        }
      },
      {
        "box": {
          "id": "obj-9",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            380.0,
            100,
            38.0,
            22.0
          ],
          "text": "pink~"
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
            380.0,
            200,
            43.0,
            22.0
          ],
          "text": "cycle~ 0.14"
        }
      },
      {
        "box": {
          "id": "obj-11",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            380.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "fontface": 0,
          "id": "obj-12",
          "linmarkers": [
            0.0,
            11025.0,
            16537.5
          ],
          "logmarkers": [
            0.0,
            100.0,
            1000.0,
            10000.0
          ],
          "maxclass": "filtergraph~",
          "nfilters": 1,
          "numinlets": 8,
          "numoutlets": 7,
          "outlettype": [
            "list",
            "float",
            "float",
            "float",
            "float",
            "list",
            "int"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            380.0,
            400,
            256.0,
            128.0
          ],
          "setfilter": [
            0,
            5,
            1,
            0,
            0,
            40.0,
            1.0,
            2.5,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ],
          "text": "filtergraph~ 500"
        }
      },
      {
        "box": {
          "id": "obj-13",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            530.0,
            100,
            38.0,
            22.0
          ],
          "text": "pink~"
        }
      },
      {
        "box": {
          "id": "obj-14",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            530.0,
            200,
            43.0,
            22.0
          ],
          "text": "cycle~ 0.16"
        }
      },
      {
        "box": {
          "id": "obj-15",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            530.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "fontface": 0,
          "id": "obj-16",
          "linmarkers": [
            0.0,
            11025.0,
            16537.5
          ],
          "logmarkers": [
            0.0,
            100.0,
            1000.0,
            10000.0
          ],
          "maxclass": "filtergraph~",
          "nfilters": 1,
          "numinlets": 8,
          "numoutlets": 7,
          "outlettype": [
            "list",
            "float",
            "float",
            "float",
            "float",
            "list",
            "int"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            530.0,
            400,
            256.0,
            128.0
          ],
          "setfilter": [
            0,
            5,
            1,
            0,
            0,
            40.0,
            1.0,
            2.5,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ],
          "text": "filtergraph~ 500"
        }
      },
      {
        "box": {
          "id": "obj-17",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            680.0,
            100,
            38.0,
            22.0
          ],
          "text": "pink~"
        }
      },
      {
        "box": {
          "id": "obj-18",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            680.0,
            200,
            43.0,
            22.0
          ],
          "text": "cycle~ 0.18"
        }
      },
      {
        "box": {
          "id": "obj-19",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            680.0,
            300,
            20.0,
            22.0
          ],
          "text": "*~"
        }
      },
      {
        "box": {
          "fontface": 0,
          "id": "obj-20",
          "linmarkers": [
            0.0,
            11025.0,
            16537.5
          ],
          "logmarkers": [
            0.0,
            100.0,
            1000.0,
            10000.0
          ],
          "maxclass": "filtergraph~",
          "nfilters": 1,
          "numinlets": 8,
          "numoutlets": 7,
          "outlettype": [
            "list",
            "float",
            "float",
            "float",
            "float",
            "list",
            "int"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            680.0,
            400,
            256.0,
            128.0
          ],
          "setfilter": [
            0,
            5,
            1,
            0,
            0,
            40.0,
            1.0,
            2.5,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0
          ],
          "text": "filtergraph~ 500"
        }
      },
      {
        "box": {
          "id": "obj-21",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            80.0,
            500,
            35.0,
            22.0
          ],
          "text": "dac~"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "destination": [
            "obj-3",
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
            "obj-3",
            1
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
            "obj-4",
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
            "obj-7",
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
            "obj-7",
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
            "obj-8",
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
            "obj-12",
            0
          ],
          "source": [
            "obj-11",
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
            "obj-15",
            0
          ],
          "source": [
            "obj-13",
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
            "obj-15",
            1
          ],
          "source": [
            "obj-14",
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
            "obj-16",
            0
          ],
          "source": [
            "obj-15",
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
            "obj-19",
            0
          ],
          "source": [
            "obj-17",
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
            "obj-19",
            1
          ],
          "source": [
            "obj-18",
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
            "obj-20",
            0
          ],
          "source": [
            "obj-19",
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
            "obj-21",
            0
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            1
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            0
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            1
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            0
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            1
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            0
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            1
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            0
          ],
          "source": [
            "obj-20",
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
            "obj-21",
            1
          ],
          "source": [
            "obj-20",
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