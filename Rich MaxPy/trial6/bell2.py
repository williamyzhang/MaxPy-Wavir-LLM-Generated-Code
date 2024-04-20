import maxpy as mp
import random

# Set up a new MaxPatch
patch = mp.MaxPatch()

# Constants for the church bell sound
numBells = 4  # Number of bells
startingPitch = 48  # MIDI note number for the base pitch of the bell, C3
pitchRange = 12  # Range for random pitches around the starting pitch
interval = 1000  # Time interval between bell strikes in ms

# Place a metro object to control the timing of the bell strikes
metro = patch.place("metro " + str(interval), num_objs=1, starting_pos=[0, 0])[0]

# Place a toggle to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]

# Connect the toggle to the metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Place a random object to generate random pitches within the given range
random_pitch = patch.place("random " + str(pitchRange), num_objs=1, starting_pos=[150, 0])[0]

# Place a + object to add the random offset to the base pitch
pitch_adder = patch.place("+ " + str(startingPitch), num_objs=1, starting_pos=[150, 50])[0]

# Connect metro to random object and random object to pitch_adder
patch.connect([metro.outs[0], random_pitch.ins[0]])
patch.connect([random_pitch.outs[0], pitch_adder.ins[1]])

# Create an array of noteout objects for the bells
bells = patch.place("noteout", num_objs=numBells, starting_pos=[300, 0])

# Connect the pitch_adder to each bell's pitch input
for bell in bells:
    patch.connect([pitch_adder.outs[0], bell.ins[0]])
    # Velocity and duration for the notes
    patch.place("message 100 2500", num_objs=1, starting_pos=bell.position - [0, 50]) # Note velocity of 100, duration of 2500ms

# Save the patch
patch.save("bell2.maxpat")
