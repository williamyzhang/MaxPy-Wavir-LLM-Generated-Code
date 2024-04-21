import maxpy as mp

# Create a new Max Patch
patch = mp.MaxPatch()

# Place a basic metro object to control timing; a toggle to start/stop
metro = patch.place("metro 1000", num_objs=1, starting_pos=[0, 0])[0]
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]

# Random object for generating random pitches within a range
random_freq = patch.place("random 1000", num_objs=1, starting_pos=[0, 100])[0]
plus = patch.place("+ 200", num_objs=1, starting_pos=[0, 150])[0] # Offset to ensure a base frequency

# Objects to control the generation of sounds
cycle = patch.place("cycle~", num_objs=1, starting_pos=[200, 150])[0]
adsr = patch.place("adsr 10 200 0.5 1000", num_objs=1, starting_pos=[200, 200])[0]
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 220])[0]

# Connect objects to simulate bird calls
patch.connect([toggle.outs[0], metro.ins[0]]) # Toggle to metro
patch.connect([metro.outs[0], random_freq.ins[0]]) # Metro to random
patch.connect([random_freq.outs[0], plus.ins[0]]) # Random to +
patch.connect([plus.outs[0], cycle.ins[0]]) # + to cycle~
patch.connect([metro.outs[0], adsr.ins[0]]) # Metro to ADSR
patch.connect([cycle.outs[0], adsr.ins[1]]) # cycle~ to ADSR
patch.connect([adsr.outs[0], dac.ins[0]]) # ADSR to dac~
patch.connect([adsr.outs[0], dac.ins[1]]) # 

# Save the patch
patch.save("bird3.maxpat")