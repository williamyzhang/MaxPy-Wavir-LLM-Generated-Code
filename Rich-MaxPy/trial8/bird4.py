import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Number of notes in the bird call sequence
numNotes = 5

# Base position for the objects in the patch
starting_x = 50
y_pos = 50

# List to store 'cycle~' objects representing bird call notes
oscillators = []

# Generate oscillators with random frequencies to simulate bird calls
for i in range(numNotes):
    # Random frequency between 1000 Hz and 5000 Hz for variety in bird calls
    freq = random.randint(1000, 5000)
    osc = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[starting_x + i*100, y_pos])[0]
    oscillators.append(osc)

# Generate an envelope with 'line~' object to control the amplitude of the bird call over time
envelope = patch.place("line~", num_objs=1, starting_pos=[50, y_pos + 100])[0]

# Connect the envelope to each oscillator's amplitude control
for osc in oscillators:
    patch.connect([envelope.outs[0], osc.ins[0]])

# Generate a metro object to trigger the envelope periodically
metro = patch.place("metro 1000", num_objs=1, starting_pos=[50, y_pos + 200])[0]

# Connect metro to a message object that defines the envelope shape
env_message = patch.place("message 0., 1. 500, 0. 1000", num_objs=1, starting_pos=[150, y_pos + 200])[0]
patch.connect([metro.outs[0], env_message.ins[0]])
patch.connect([env_message.outs[0], envelope.ins[0]])

# Toggle to start/stop the metro (bird call)
toggle = patch.place("toggle", num_objs=1, starting_pos=[50, y_pos + 250])[0]
patch.connect([toggle.outs[0], metro.ins[0]])

# Save the patch
patch.save("bird4.maxpat")
