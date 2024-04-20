import maxpy as mp

# Creating a new patch
patch = mp.MaxPatch()

# Place a cycle~ object for the sine wave oscillator at frequency 440 Hz
sine_wave = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Place a cycle~ object for the LFO at a low frequency (e.g., 5 Hz for vibrato)
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object to modulate the sine wave's frequency with the LFO 
modulation = patch.place("*~ 10", num_objs=1, starting_pos=[100, 300])[0]

# Place a +~ object to add the modulation signal to the original frequency
frequency_addition = patch.place("+~ 440", num_objs=1, starting_pos=[100, 400])[0]

# Place a cycle~ object as the final oscillator receiving the modulated frequency
final_oscillator = patch.place("cycle~", num_objs=1, starting_pos=[100, 500])[0]

# Place a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 600])[0]

# Connecting the LFO to the modulation *~ object
patch.connect([lfo.outs[0], modulation.ins[0]])

# Connecting the modulated signal to the frequency of the final oscillator
patch.connect([modulation.outs[0], frequency_addition.ins[0]])
patch.connect([frequency_addition.outs[0], final_oscillator.ins[0]])

# Outputting the final oscillator to the dac~
patch.connect([final_oscillator.outs[0], dac.ins[0]])
patch.connect([final_oscillator.outs[0], dac.ins[1]])

# Save the Max patch with a name
patch.save("LFO9.maxpat")