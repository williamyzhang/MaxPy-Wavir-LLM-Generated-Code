import maxpy as mp

# Initialize a new Max patch
patch = mp.MaxPatch()

# Create a sine wave oscillator with a frequency of 440 Hz
cyc = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Create a low frequency oscillator (LFO) to modulate the frequency of the sine wave
# for a vibrato effect. Set its frequency to 5 Hz, which is a common vibrato rate.
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]

# Create a scaling object to adjust the depth of the vibrato effect. 
# This scales the LFO's output, which is initially between -1 and 1, 
# to a smaller range suitable for vibrato (e.g., +/- 50 Hz around the sine wave's frequency).
scale = patch.place("*~ 50", num_objs=1, starting_pos=[100, 300])[0]

# Create an addition object to add the scaled LFO output to the sine wave's base frequency.
# This creates the vibrato effect by continuously varying the frequency of the sine wave.
add = patch.place("+~ 440", num_objs=1, starting_pos=[100, 400])[0]

# Create a dac~ object to output the audio signal
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 500])[0]

# Connect the LFO to the scaling object
patch.connect([lfo.outs[0], scale.ins[0]])

# Connect the scaled LFO output to the addition object
patch.connect([scale.outs[0], add.ins[0]])

# Connect the sine wave oscillator directly to one input of the addition object
# This is not strictly necessary as we've hardcoded the 440 Hz frequency in the '+~ 440' object,
# but illustrates how you might structure the patch with variable base frequency.
patch.connect([cyc.outs[0], add.ins[1]])

# Connect the output of the addition object, which is the sine wave with vibrato, to the dac~ object
patch.connect([add.outs[0], dac.ins[0]])
patch.connect([add.outs[0], dac.ins[1]])  # Connect to both left and right channels

# Save the Max patch
patch.save("lfo3.maxpat")