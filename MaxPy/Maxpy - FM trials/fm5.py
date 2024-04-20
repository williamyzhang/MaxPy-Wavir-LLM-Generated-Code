import maxpy as mp

# Initialize a MaxPatch
patch = mp.MaxPatch()

# Carrier oscillator (sine wave)
carrier = patch.place("cycle~ 440", num_objs=1, starting_pos=[50, 50])[0]

# Modulator oscillator (sine wave, will modulate the frequency of the carrier)
modulator = patch.place("cycle~ 220", num_objs=1, starting_pos=[50, 150])[0]

# Modulation index - determines the depth of the modulation
modulation_index = patch.place("*~ 100", num_objs=1, starting_pos=[50, 250])[0]

# Connect modulator to modulation index
patch.connect([modulator.outs[0], modulation_index.ins[0]])

# Multiply modulator's output with the carrier frequency to achieve FM synthesis
modulated_freq = patch.place("*~", num_objs=1, starting_pos=[200, 150])[0]

# Connect modulation index to modulated frequency multiplication
patch.connect([modulation_index.outs[0], modulated_freq.ins[0]])

# Connect carrier to modulated frequency multiplication (to modulate carrier frequency with modulated frequency signal)
patch.connect([carrier.outs[0], modulated_freq.ins[1]])

# Output the modulated signal
dac = patch.place("dac~", num_objs=2, starting_pos=[350, 50])[0]

# Connect modulated frequency output to dac (audio output)
patch.connect([modulated_freq.outs[0], dac.ins[0]])
patch.connect([modulated_freq.outs[0], dac.ins[1]])

# Save the patch as an FM synthesis Max patch
patch.save("fm5.maxpat")