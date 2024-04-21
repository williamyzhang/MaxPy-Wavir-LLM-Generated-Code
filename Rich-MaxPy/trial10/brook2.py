import maxpy as mp
import random

patch = mp.MaxPatch()

numWaves = 15  # Number of sine waves to simulate water sounds
starting_pos_y = 100
offset_y = 40  # Vertical spacing between objects
metro_period = 500  # Period of metro object

# Creating a metro object to control randomness timing
metro = patch.place("metro " + str(metro_period), num_objs=1, starting_pos=[100, starting_pos_y])[0]

# Place a toggle to turn the metro on and off
toggle = patch.place("toggle", num_objs=1, starting_pos=[50, starting_pos_y])[0]
# Connect toggle to metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Loop to create multiple cycle~ objects and their controls
for i in range(numWaves):
    ypos = starting_pos_y + offset_y * (i + 1)
    
    # Random object for frequency variations
    randomFreq = patch.place("random 1000", num_objs=1, starting_pos=[150, ypos])[0]
    patch.connect([metro.outs[0], randomFreq.ins[0]])
    
    # Adding base frequency to random values for audible frequency range
    add = patch.place("+ 200", num_objs=1, starting_pos=[250, ypos])[0]
    patch.connect([randomFreq.outs[0], add.ins[0]])
    
    # Cycle~ object for generating sound wave
    cycle = patch.place("cycle~", num_objs=1, starting_pos=[350, ypos])[0]
    patch.connect([add.outs[0], cycle.ins[0]])
    
    # Gain control for volume variations
    gain = patch.place("gain~", num_objs=1, starting_pos=[450, ypos])[0]

    # Random volume control
    randomGain = patch.place("random 50", num_objs=1, starting_pos=[150, ypos + 20])[0]
    patch.connect([metro.outs[0], randomGain.ins[0]])
    multiply = patch.place("*~ 0.02", num_objs=1, starting_pos=[250, ypos + 20])[0]
    patch.connect([randomGain.outs[0], multiply.ins[1]])
    patch.connect([cycle.outs[0], multiply.ins[0]])
    patch.connect([multiply.outs[0], gain.ins[0]])
    
    if i == 0:
        # Connecting first gain~ to speaker for initial setup
        dac = patch.place("ezdac~", num_objs=1, starting_pos=[700, starting_pos_y + 100])[0]
        patch.connect([gain.outs[0], dac.ins[0]])
        patch.connect([gain.outs[0], dac.ins[1]])
    else:
        # Subsequent sounds are mixed into the first gain~
        patch.connect([gain.outs[0], patch.objects[9].ins[0]])  # Assuming 'patch.objects[9]' is the first gain~

patch.save("brook2.maxpat")
