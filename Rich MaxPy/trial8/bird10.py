import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Base frequency for the bird call (in Hz)
base_freq = 800

# Number of chirps to generate
num_chirps = 5

# Positioning variables
x_pos = 100
y_pos = 100
x_offset = 200

# Create phasor~ to generate the base signal
phasor = patch.place('phasor~', num_objs=1, starting_pos=[x_pos, y_pos])[0]

# Create a cycle~ for modulation
cycle = patch.place('cycle~', num_objs=1, starting_pos=[x_pos, y_pos+50])[0]

# Loop to generate multiple chirps with variable frequencies and envelopes
for i in range(num_chirps):
    # Randomly adjust frequency and volume
    freq_variation = random.uniform(0.8, 1.2)
    chirp_freq = base_freq * freq_variation
    envelope_variation = random.uniform(0.2, 0.4)
    
    # Create a new message with frequency for the phasor~
    freq_msg = patch.place(f'message {chirp_freq}', num_objs=1, starting_pos=[x_pos + x_offset*(i+1), y_pos])[0]
    
    # Create a *~ object to modulate the phasor's amplitude by the cycle~
    multiplier = patch.place('*~', num_objs=1, starting_pos=[x_pos + x_offset*(i+1), y_pos+100])[0]
    
    # Create line~ and message to control the volume envelope
    line = patch.place('line~', num_objs=1, starting_pos=[x_pos + x_offset*(i+1), y_pos+150])[0]
    volume_msg = patch.place(f'message 0., {envelope_variation} 1000, 0. 250', num_objs=1, starting_pos=[x_pos + x_offset*(i+1), y_pos+200])[0]
    
    # Connect the objects
    patch.connect([freq_msg.outs[0], phasor.ins[0]])
    patch.connect([phasor.outs[0], multiplier.ins[0]])
    patch.connect([cycle.outs[0], multiplier.ins[1]])
    patch.connect([multiplier.outs[0], line.ins[0]])
    patch.connect([volume_msg.outs[0], line.ins[0]])

# Create dac~ to output the sound
dac = patch.place('dac~', num_objs=1, starting_pos=[x_pos, y_pos+250])

# Connect the last line~ object to dac~
patch.connect([line.outs[0], dac.ins[0]])

patch.save("bird10.maxpat")
