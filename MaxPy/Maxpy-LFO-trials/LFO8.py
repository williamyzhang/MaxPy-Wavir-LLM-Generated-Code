import maxpy as mp

# Create a new patch
patch = mp.MaxPatch()

# Create a cycle~ object for the sine wave with an initial frequency of 440Hz
cycle = patch.place("cycle~ 440", num_objs=1, starting_pos=[0, 220])[0]

# Create a cycle~ object for the LFO with a frequency of 5Hz (for vibrato)
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 100])[0]

# Create an *~ object for multiplying LFO signal to modulate the frequency of the original sine wave
lfo_amp = patch.place("*~ 10", num_objs=1, starting_pos=[200, 160])[0]

# Connect the LFO to the *~ object to control modulation depth
patch.connect([lfo.outs[0], lfo_amp.ins[0]])

# Create a +~ object to add the modulated signal to the original frequency of the sine wave (440Hz)
freq_mod = patch.place("+~ 440", num_objs=1, starting_pos=[300, 220])[0]

# Connect the modulated LFO signal to the +~ object
patch.connect([lfo_amp.outs[0], freq_mod.ins[0]])

# Connect the resulting frequency-modulated signal to the cycle~ object's frequency inlet
patch.connect([freq_mod.outs[0], cycle.ins[0]])

# Create a dac~ object to output the audio
dac = patch.place("dac~", num_objs=1, starting_pos=[0, 320])[0]

# Connect the modulated sine wave to the dac~
patch.connect([cycle.outs[0], dac.ins[0]])

# Save the patch with a meaningful name
patch.save("LFO8.maxpat")