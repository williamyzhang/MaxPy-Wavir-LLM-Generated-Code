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
            180.0,
            100,
            44.0,
            22.0
          ],
          "text": "noise~"
        }
      },
      {
        "box": {
          "fontface": 0,
          "id": "obj-2",
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
            180.0,
            200,
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
          "text": "filtergraph~ 1000"
        }
      },
      {
        "box": {
          "id": "obj-3",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            180.0,
            400,
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
            "obj-2",
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
            "obj-3",
            1
          ],
          "source": [
            "obj-2",
            1
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