import maxpy as mp
import random

patch = mp.MaxPatch()

# Base frequency for the bird call
base_freq = 800

# Number of bird call variations
num_calls = 5

# Create tunable oscillators with random frequency deviations to mimic bird calls
osc = []
for i in range(num_calls):
    freq = base_freq + random.randint(-400, 400)  # Randomize frequency to vary pitches
    osc_obj = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[i*100, 100])[0]
    osc.append(osc_obj)

# Create a metro object to trigger bird calls at random intervals
metro = patch.place("metro", num_objs=1, starting_pos=[0, 0])[0]
patch.place(f"random {num_calls}", num_objs=1, starting_pos=[100, 0], connect_to=[metro.ins[0]])

# Gate to control which bird call is active
gate = patch.place("gate", num_objs=1, starting_pos=[200, 0])
patch.connect([metro.outs[0], gate.ins[0]])

# Connect the gate to the oscillators
for i, osc_obj in enumerate(osc):
    patch.connect([gate.outs[i], osc_obj.ins[0]])

# Volume control and output
vol = patch.place("gain~", num_objs=1, starting_pos=[600, 100])[0]
out = patch.place("dac~", num_objs=1, starting_pos=[700, 100])

# Connect all oscillators to the volume control
for osc_obj in osc:
    patch.connect([osc_obj.outs[0], vol.ins[0]])

# Connect the volume to the output
patch.connect([vol.outs[0], out.ins[0]])
patch.connect([vol.outs[1], out.ins[1]])

# Toggle to control the metro and thus start/stop the bird call
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]
patch.connect([toggle.outs[0], metro.ins[0]])

# Save the patch
patch.save("bird5.maxpat")
