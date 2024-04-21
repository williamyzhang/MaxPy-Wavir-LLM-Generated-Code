import maxpy as mp 

# Creating a new MaxPatch instance
patch = mp.MaxPatch()

# Place two cycle~ objects to generate sine waves at 350Hz and 440Hz
sine1 = patch.place("cycle~ 350", num_objs=1, starting_pos=[100, 100])[0]
sine2= patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object (multiplier) for each sine wave to control their amplitude
multiplier1 = patch.place("*~ 0.5", num_objs=1, starting_pos=[200, 100])[0]
multiplier2 = patch.place("*~ 0.5", num_objs=1, starting_pos=[200, 200])[0]

# Connect each cycle~ object to its corresponding multiplier
patch.connect([sine1.outs[0], multiplier1.ins[0]])
patch.connect([sine2.outs[0], multiplier2.ins[0]])

# Place a +~ object to sum the signals of the two sine waves
sum_signal = patch.place("+~", num_objs=1, starting_pos=[300, 150])[0]

# Connect both multipliers to the +~ object
patch.connect([multiplier1.outs[0], sum_signal.ins[0]])
patch.connect([multiplier2.outs[0], sum_signal.ins[0]])

# Place a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 150])[0]

# Connect the sum_signal object to the dac~ to hear the sound
patch.connect([sum_signal.outs[0], dac.ins[0]])
patch.connect([sum_signal.outs[0], dac.ins[1]])

# Save the patch
patch.save("DT6.maxpat")