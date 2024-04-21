# Importing the MaxPy package and creating a new patch
import maxpy as mp

patch = mp.MaxPatch()

# Defining the frequencies for the dial tone, traditionally 350 Hz and 440 Hz
freq1 = 350
freq2 = 440

# Creating two cycle~ objects to generate sine waves at these frequencies
sine1 = patch.place(f"cycle~ {freq1}", num_objs=1, starting_pos=[50, 100])[0]
sine2 = patch.place(f"cycle~ {freq2}", num_objs=1, starting_pos=[200, 100])[0]

# Creating a gain~ object to act as a mixer for these two signals
mixer = patch.place("gain~", num_objs=1, starting_pos=[125, 250])[0]

# Creating a dac~ object to route the output to the speakers
output = patch.place("dac~", num_objs=1, starting_pos=[125, 400])[0]

# Connecting the cycle~ objects to the mixer
patch.connect([sine1.outs[0], mixer.ins[0]])
patch.connect([sine2.outs[0], mixer.ins[1]])

# Connecting the mixer to the dac~ object
patch.connect([mixer.outs[0], output.ins[0]])
patch.connect([mixer.outs[1], output.ins[1]])

# Naming and saving the patch
patch.save("dial4.maxpat")