import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of bells
numBells = 5

# MIDI note range for bell sounds
lowNote = 48  # C2
highNote = 60  # C3

# Random timing range for bell strikes (in ms)
minInterval = 1000  # 1 second
maxInterval = 5000  # 5 seconds

# Creating objects
mtof = patch.place("mtof", num_objs=numBells, starting_pos=[100, 50 * numBells])
ezdac = patch.place("ezdac~", num_objs=1, starting_pos=[600, 100])[0]
osc = patch.place("cycle~ 440", num_objs=numBells, starting_pos=[200, 50 * numBells])
metro = []
toggle = []

for i in range(numBells):
    # Generate random interval for each bell
    interval = random.randint(minInterval, maxInterval)
    metro.append(patch.place("metro " + str(interval), num_objs=1, starting_pos=[0, 50 * (i + 1)])[0])
    toggle.append(patch.place("toggle", num_objs=1, starting_pos=[50, 50 * (i + 1)])[0])
    
    # Random note for each bell
    randNote = random.randint(lowNote, highNote)
    message = patch.place("message " + str(randNote), num_objs=1, starting_pos=[100, (50 * (i + 1)) + 25])[0]

    # Connections
    patch.connect([toggle[i].outs[0], metro[i].ins[0]])
    patch.connect([metro[i].outs[0], message.ins[0]])
    patch.connect([message.outs[0], mtof[i].ins[0]])
    patch.connect([mtof[i].outs[0], osc[i].ins[0]])
    patch.connect([osc[i].outs[0], ezdac.ins[i]])

# Setup toggle for "church bell concert"
concertToggle = patch.place("toggle", num_objs=1, starting_pos=[50, 25])[0]

# Connect the concert toggle to individual bell toggles
for t in toggle:
    patch.connect([concertToggle.outs[0], t.ins[0]])

# Save the patch
patch.save("bell7.maxpat")
