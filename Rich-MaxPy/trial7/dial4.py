import maxpy as mp
import random

patch = mp.MaxPatch()

# Fundamental frequencies for dial tone
base_freq1 = 350  # Static frequency
base_freq2 = 440  # This will be randomly adjusted

# Place two cycle~ objects that generate sine waves
cycle1 = patch.place("cycle~", num_objs=1, starting_pos=[100, 100])[0]
cycle2 = patch.place("cycle~", num_objs=1, starting_pos=[100, 200])[0]

# Number box for frequency display/adjustment
num1 = patch.place("number", num_objs=1, starting_pos=[200, 100])[0]
num2 = patch.place("number", num_objs=1, starting_pos=[200, 200])[0]

# Dial tone generator feedback to demonstrate change in frequency
toggle = patch.place("toggle", num_objs=1, starting_pos=[50, 50])[0]
metro = patch.place("metro", args="200", num_objs=1, starting_pos=[50, 100])[0]  # Change dial tone every 200 ms

# Connect objects
patch.connect([toggle.outs[0], metro.ins[0]])  # Start/stop the metro with a toggle

# Change frequency randomly with a trivial loop expression for example purposes
for _ in range(1):  # A placeholder loop to illustrate potential dynamic changes
    new_freq2 = base_freq2 + random.randint(-10, 10)  # Slight random adjustment to second frequency
    patch.message(cycle1, f"freq {base_freq1}")
    patch.message(cycle2, f"freq {new_freq2}")

# Connect frequency number boxes to cycles~
patch.connect([num1.outs[0], cycle1.ins[0]])
patch.connect([num2.outs[0], cycle2.ins[0]])

# Connect metro to trigger frequency change
patch.connect([metro.outs[0], num1.ins[0]])
patch.connect([metro.outs[0], num2.ins[0]])

# Pre-populate number boxes with initial frequencies
patch.message(num1, f"set {base_freq1}")
patch.message(num2, f"set {base_freq2}")

patch.save("dial4.maxpat")
