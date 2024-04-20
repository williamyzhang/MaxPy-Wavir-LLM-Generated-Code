import maxpy as mp
import random

patch = mp.MaxPatch()

# Parameters to simulate church bell sounds
numBells = 4
bellFrequencies = [261.63, 329.63, 392.00, 523.25] # Approximates C4, E4, G4, C5

# Positioning
verticalSpacing = 100
horizontalSpacing = 200

# Generating toggles for enabling/disabling each bell sound
toggles = patch.place("toggle", num_objs=numBells, starting_pos=[0, 100], spacing=[horizontalSpacing, 0])

# Generating metro objects for each bell with varying speeds
metros = []
for i in range(numBells):
    speed = random.randint(2000, 4000) # Milliseconds, varying the rhythm
    metros.append(patch.place("metro "+str(speed), num_objs=1, starting_pos=[i*horizontalSpacing, 100 + verticalSpacing])[0])

# Generating 'mtof' objects (MIDI to frequency converter) for pitch variation
# and connecting each to a cycle~ object to simulate bell sounds
for i, metro in enumerate(metros):
    freq = bellFrequencies[i] # Base frequency for each bell
    variation = random.randint(-5, 5) # Small random pitch variation

    mtof = patch.place("mtof", num_objs=1, starting_pos=[i*horizontalSpacing, 200 + verticalSpacing*2])[0]
    cycle = patch.place("cycle~ "+str(freq + variation), num_objs=1, starting_pos=[i*horizontalSpacing, 300 + verticalSpacing*3])[0]

    # Connection
    patch.connect([toggles[i].outs[0], metro.ins[0]])
    patch.connect([metro.outs[0], mtof.ins[0]])
    patch.connect([mtof.outs[0], cycle.ins[0]])

# Saving the patch
patch.save("bell3.maxpat")
