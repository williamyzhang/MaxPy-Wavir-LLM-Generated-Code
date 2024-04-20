import maxpy as mp

# Create a new patch
patch = mp.MaxPatch()

# Create a carrier signal (sine wave) with a base frequency of 440Hz
carrier_freq = 440
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create a modulator signal (sine wave) with a lower frequency (e.g., 1Hz for vibrato effect)
modulator_freq = 1
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Adjust the modulation index (depth of frequency modulation)
modulation_index = 100  # This value controls the intensity of the FM effect
modulation_index_adjust = patch.place(f"*~ {modulation_index}", num_objs=1, starting_pos=[200, 200])[0]

# Modulate the carrier's frequency
# Adding the modulated signal to the carrier frequency
freq_modulation = patch.place(f"+~ {carrier_freq}", num_objs=1, starting_pos=[300, 100])[0]

# Connect the modulator to the modulation index adjuster
patch.connect([modulator.outs[0], modulation_index_adjust.ins[0]])
# Connect the modulation index adjuster to the frequency modulation addition
patch.connect([modulation_index_adjust.outs[0], freq_modulation.ins[0]])
# Connect the frequency modulation to the carrier's frequency modulation input
patch.connect([freq_modulation.outs[0], carrier.ins[0]])

# Output the modulated signal
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 100])[0]
patch.connect([carrier.outs[0], dac.ins[0]])

# Save the patch
patch.save("fm10.maxpat")