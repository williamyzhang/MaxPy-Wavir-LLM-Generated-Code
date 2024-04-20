import maxpy as mp
import random

# Create a new MaxPatch object
patch = mp.MaxPatch()

# Object creation
sine = patch.place("cycle~", starting_pos=[100, 100])[0]  # Oscillator for sine wave
dac = patch.place("dac~", starting_pos=[100, 300])[0]  # Audio output

lfo = patch.place("cycle~", starting_pos=[300, 100])[0]  # Oscillator for LFO
scale = patch.place("scale 0. 1. 0.05 0.2", starting_pos=[300, 200])[0]  # Scale LFO output to a smaller range
line = patch.place("line~", starting_pos=[300, 300])[0]  # Smooth control signal

# Generating different LFO frequencies using random values within a specific range
num_lfos = 3  # number of different LFO frequencies to create
for i in range(num_lfos):
    # Generate a random frequency for the LFO within the range 0.1 to 5 Hz
    lfo_freq = round(random.uniform(0.1, 5), 2)
    message = patch.place(f"message {lfo_freq}", starting_pos=[450 + i*100, 100])[0]  # Message box to hold frequency value
    patch.connect([message.outs[0], lfo.ins[0]])  # Connect message to LFO's frequency inlet

# Connecting objects
patch.connect([sine.outs[0], line.ins[0]])  # Sine wave to line~ for smooth control
patch.connect([line.outs[0], dac.ins[0]])   # line~ object to dac~ left inlet
patch.connect([line.outs[0], dac.ins[1]])   # line~ object to dac~ right inlet
patch.connect([lfo.outs[0], scale.ins[0]])  # LFO to scale object
patch.connect([scale.outs[0], sine.ins[0]])  # Scaled LFO output to control frequency of sine wave oscillator

# Save the patch
patch.save("lfo10.maxpat")
