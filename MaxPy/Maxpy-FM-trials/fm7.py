import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Create carrier oscillator (sine wave) with a default frequency
carrier = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Create modulator oscillator (sine wave), its frequency modulates the carrier
# The frequency of the modulator determines how much the carrier's frequency is modulated
modulator = patch.place("cycle~ 220", num_objs=1, starting_pos=[100, 200])[0]

# Add a multiply object (*~) to multiply the modulator signal, controlling modulation depth
modulation_depth = patch.place("*~ 100", num_objs=1, starting_pos=[200, 200])[0]

# Connect modulator to modulation depth
patch.connect([modulator.outs[0], modulation_depth.ins[0]])

# Add a plus object (+~) to sum the modulated signal with the carrier frequency
# This determines the carrier's new frequency
frequency_sum = patch.place("+~ 440", num_objs=1, starting_pos=[300, 150])[0]

# Connect modulation depth to frequency sum
patch.connect([modulation_depth.outs[0], frequency_sum.ins[0]])

# Connect frequency sum to the frequency inlet of the carrier
patch.connect([frequency_sum.outs[0], carrier.ins[0]])

# Create a DAC~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 100])[0]

# Connect the carrier to the DAC~
patch.connect([carrier.outs[0], dac.ins[0]])
patch.connect([carrier.outs[0], dac.ins[1]])

# Save the patch
patch.save("fm7.maxpat")