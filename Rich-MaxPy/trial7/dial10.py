import maxpy as mp
import random

# Creating a new MaxPatch
patch = mp.MaxPatch()

# It's common to use a phasor~ to generate a continuous stream of signal that we will manipulate 
# to generate our dual-frequency dial tone. We'll only require one phasor for this.
phasor = patch.place("phasor~", num_objs=1, starting_pos=[100, 100])[0]

# We'll use two cycle~ objects, one for each frequency of the dial tone, 350Hz and 440Hz
tone1 = patch.place("cycle~ 350", num_objs=1, starting_pos=[200, 150])[0]
tone2 = patch.place("cycle~ 440", num_objs=1, starting_pos=[200, 200])[0]

# Connecting phasor~ to cycle~ objects. Phasor~ outputs a signal ramp from 0 to 1 at audio rate,
# which drives the cycle~ objects at their respective frequencies
patch.connect([phasor.outs[0], tone1.ins[0]])
patch.connect([phasor.outs[0], tone2.ins[0]])

# As we want to mix these two signals together, we will use a +~ object
mixer = patch.place("+~", num_objs=1, starting_pos=[300, 175])[0]

# Connecting the cycle~ objects to the mixer
patch.connect([tone1.outs[0], mixer.ins[0]])
patch.connect([tone2.outs[0], mixer.ins[1]])

# Finally, we need an output to hear our dial tone. dac~ object represents the digital-to-analog converter,
# essentially the speakers/headphones
output = patch.place("dac~", num_objs=1, starting_pos=[400, 175])[0]

# Connecting the mixer to the output so we can hear it
patch.connect([mixer.outs[0], output.ins[0]])
patch.connect([mixer.outs[0], output.ins[1]])

# Saving the patch. This will create a .maxpat file that can be opened with Max/MSP
patch.save("dial10.maxpat")
