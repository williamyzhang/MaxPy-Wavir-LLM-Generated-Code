import maxpy as mp

# Create a new Max Patch
patch = mp.MaxPatch()

# Create the carrier oscillator - a sine wave oscillator
carrier_freq = 440  # Frequency of the carrier in Hz
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create the modulator oscillator
modulator_freq = 50  # Frequency of the modulator in Hz
modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Create a multiplier object to multiply the modulator signal with the carrier signal
multiply = patch.place("*~", num_objs=1, starting_pos=[100, 300])[0]

# Create DAC object to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 400])[0]

# Connect the carrier oscillator to the left inlet of the multiplier
patch.connect([carrier.outs[0], multiply.ins[0]])

# Connect the modulator oscillator to the right inlet of the multiplier
patch.connect([modulator.outs[0], multiply.ins[1]])

# Connect the output of the multiplier (mixed signal) to the DAC for audio output
patch.connect([multiply.outs[0], dac.ins[0]])

# Save the Max Patch with the name "AM_Synthesis.maxpat"
patch.save("AM6.maxpat")