import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of bell tones
numBells = 4

# Base frequencies for bell tones (in Hz)
bellFrequencies = [440, 493.88, 523.25, 587.33]  # Example frequencies in A Major scale

# Place toggle to turn on/off the bell sequence
tg = patch.place("toggle", num_objs=1, starting_pos=[-100, 100])[0]

# Place metro object to control the timing of tones
mtr = patch.place("metro 2000", num_objs=1, starting_pos=[0,100])[0]

# Connect toggle to metro
patch.connect([tg.outs[0], mtr.ins[0]])

# Random object to pick which bell tone to play
rnd = patch.place("random " + str(numBells), num_objs=1, starting_pos=[100,100])[0]

# Use a counter to cycle through bell tones based on random trigger
cnt = patch.place("counter 1 " + str(numBells), num_objs=1, starting_pos=[200,100])[0]

patch.connect([mtr.outs[0], rnd.ins[0]])
patch.connect([rnd.outs[0], cnt.ins[0]])

# Placing cycle~ objects for each bell frequency - randomized slightly for variation
for i in range(numBells):
    freq_variation = random.uniform(-2.0, 2.0)  # Slight random variation in frequency
    cycle = patch.place(f"cycle~ {bellFrequencies[i] + freq_variation}", num_objs=1, starting_pos=[i*150, 200])[0]
    scale = patch.place("*~ 0.2", num_objs=1, starting_pos=[i*150, 300])[0]  # Scale down the amplitude
    dac = patch.place("dac~", num_objs=1, starting_pos=[-100, -1])[0]  # Output to soundcard - placed once
    patch.connect([cnt.outs[i], cycle.ins[0]])  # Use cnt to trigger cycle~
    patch.connect([cycle.outs[0], scale.ins[0]])  # Connect cycle~ to scale
    patch.connect([scale.outs[0], dac.ins[0]])  # Connect scale to left channel of dac~
    patch.connect([scale.outs[0], dac.ins[1]])  # Also connect to right channel for stereo

patch.save("bell10.maxpat")
