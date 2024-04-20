import maxpy as mp 

patch = mp.MaxPatch()

# Generating the dual tones for the dial tone
osc1 = patch.place("cycle~ 350", num_objs=1, starting_pos=[0, 100])[0]
osc2 = patch.place("cycle~ 440", num_objs=1, starting_pos=[200, 100])[0]

# Amplitude control to merge the tones gently
amp_control = patch.place("*~ 0.5", num_objs=1, starting_pos=[100, 200])[0]

# Output object for the dial tone
output = patch.place("dac~", num_objs=1, starting_pos=[100, 300])[0]

# Connecting the oscillators to the amplitude controle
patch.connect([osc1.outs[0], amp_control.ins[0]])
patch.connect([osc2.outs[0], amp_control.ins[1]])

# Connecting the merged signal to the output
patch.connect([amp_control.outs[0], output.ins[0]])
patch.connect([amp_control.outs[0], output.ins[1]])

# Saving the patch
patch.save("DT9.maxpat")