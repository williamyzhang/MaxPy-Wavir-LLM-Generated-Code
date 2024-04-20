import maxpy as mp
import random

# Initial settings for the patch
patch = mp.MaxPatch()
starting_pos = [100, 100] # Starting position for the first object

# Create sine oscillator
sine = patch.place("cycle~", num_objs=1, starting_pos=starting_pos)[0]

# Generate LFO using cycle~ with random frequency between 0.1 to 10 Hz for vibrato effect
lfo_freq = random.uniform(0.1, 10)
lfo = patch.place(f"cycle~ {lfo_freq}", num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 100])[0]

# Creating *~ object to modulate sine wave frequency with LFO
multiply = patch.place("*~ 100", num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 200])[0]  # Modulation depth fixed at 100Hz

# Creating +~ object to add base frequency to the modulation signal
add = patch.place("+~ 440", num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 300])[0]  # Base frequency fixed at 440Hz for demo

# Creating a dac~ object to hear the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 400])

# Connecting objects
patch.connect([lfo.outs[0], multiply.ins[0]])
patch.connect([multiply.outs[0], add.ins[0]])
patch.connect([add.outs[0], sine.ins[0]])
patch.connect([sine.outs[0], dac.ins[0]])
patch.connect([sine.outs[0], dac.ins[1]])

patch.save("lfo2.maxpat")
