import maxpy as mp

# Start a new MaxPatch
patch = mp.MaxPatch()

# Base frequency for bird call
base_freq = 440

# Random pitch generator to mimic natural variation
random_pitch = patch.place("random 500", num_objs=1, starting_pos=[0, 50])[0]

# Scale object to restrict random range to a musically pleasing interval
scale = patch.place("scale 0 500 0.95 1.05", num_objs=1, starting_pos=[100, 50])[0]

# Main oscillator for bird call tone, frequency slightly varies
osc1 = patch.place("cycle~ " + str(base_freq), num_objs=1, starting_pos=[200, 0])[0]

# Secondary oscillator for modulation effect, frequency slightly higher for variation
osc2 = patch.place("cycle~ " + str(base_freq * 1.025), num_objs=1, starting_pos=[200, 100])[0]

# Using a simple envelope to shape the bird call
env = patch.place("line~", num_objs=1, starting_pos=[400, 50])[0]

# Metro object to trigger bird calls at intervals
metro = patch.place("metro 2000", num_objs=1, starting_pos=[0, -50])[0]

# Toggle object to turn metro on/off
toggle = patch.place("toggle", num_objs=1, starting_pos=[-100, -50])[0]

# Connection from toggle to metro to start/stop production of bird calls
patch.connect([toggle.outs[0], metro.ins[0]])

# Connection from metro to random pitch generator to trigger new value
patch.connect([metro.outs[0], random_pitch.ins[0]])

# Routing random values through scale object
patch.connect([random_pitch.outs[0], scale.ins[0]])

# Modifying oscillators' frequency with random pitch
patch.connect([scale.outs[0], osc1.ins[0]])
patch.connect([scale.outs[0], osc2.ins[0]])

# Connecting oscillators to envelope
patch.connect([osc1.outs[0], env.ins[0]])
patch.connect([osc2.outs[0], env.ins[0]])

# Saving the patch
patch.save("BC10.maxpat")