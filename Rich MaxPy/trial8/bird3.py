"""
This MaxPy script generates a simple simulation of bird calls using random pitches and rhythms.
"""

import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of pitches to generate for the bird call
num_pitches = 5

# Starting positions for the objects
start_pos_x = 100
start_pos_y = 100
spacing_y = 75

# Creating Metro Object for controlling the timing
metro = patch.place("metro", num_objs=1, starting_pos=[start_pos_x, start_pos_y])[0]
# Uses a random argument between 200 to 600 milliseconds for varied rhythm
metro.args = [random.randint(200, 600)]

# Initializing a toggle for the metro object
toggle = patch.place("toggle", num_objs=1, starting_pos=[start_pos_x, start_pos_y - 50])[0]

# Connect toggle to metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Loop to create a series of pitches with random frequencies
for i in range(num_pitches):
    # Random frequencies to simulate bird calls, within a middle to high range
    freq = random.randint(300, 3000)
    
    # Placement of noteout object
    noteout = patch.place("noteout", num_objs=1,
                          starting_pos=[start_pos_x, start_pos_y + spacing_y * (i + 1)])[0]
    
    # Using the makenote object to trigger notes based on the metro object
    makenote = patch.place(f"makenote {freq} 100",
                           num_objs=1,
                           starting_pos=[start_pos_x, start_pos_y + spacing_y * (i + 1) - 25])[0]
    
    # Connect makenote to noteout
    patch.connect([makenote.outs[0], noteout.ins[0]])
    
    # Trigger the makenote with the metro pulse
    patch.connect([metro.outs[0], makenote.ins[1]])

# Save the bird call simulation Max patch
patch.save("bird3.maxpat")
