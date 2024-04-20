import maxpy as mp

# Initialize a new Max patch
patch = mp.MaxPatch()

# Create a cycle~ object for the sine wave with a frequency of 440Hz
sine_wave = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Create an LFO cycle~ object with a low frequency (e.g., 5Hz for the vibrato)
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]

# Create a *~ object to modulate the frequency of the sine wave
freq_mod = patch.place("*~ 20", num_objs=1, starting_pos=[100, 300])[0]

# Create a +~ object to add the modulation to the base frequency (440Hz)
base_freq = patch.place("+~ 440", num_objs=1, starting_pos=[100, 400])[0]

# Create a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 500])[0]

# Connect the LFO to the frequency modulation
patch.connect([lfo.outs[0], freq_mod.ins[0]])

# Connect the frequency modulation to the base frequency
patch.connect([freq_mod.outs[0], base_freq.ins[0]])

# Replace the sine wave's static frequency with the modulated frequency
patch.connect([base_freq.outs[0], sine_wave.frequency])

# Connect the sine wave to the dac~ object to output the sound
patch.connect([sine_wave.outs[0], dac.ins[0]])

# Save the Max patch
patch.save("lfo1.maxpat")