import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Carrier oscillator - Sine wave at 440Hz (A4 note)
carrier = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Modulating oscillator - Sine wave at a lower frequency (e.g., 1Hz for a slow amplitude variation)
modulator = patch.place("cycle~ 1", num_objs=1, starting_pos=[100, 200])[0]

# Multiply~ object to modulate the amplitude of the carrier signal with the modulating signal
multiply = patch.place("*~", num_objs=1, starting_pos=[250, 150])[0]

# Connections
patch.connect([carrier.outs[0], multiply.ins[0]])  # Connect carrier to the left inlet of multiply~
patch.connect([modulator.outs[0], multiply.ins[1]])  # Connect modulator to the right inlet of multiply~

# Output object to hear the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 150])[0]

# Connect the multiply~ output to the DAC for audio output
patch.connect([multiply.outs[0], dac.ins[0]])
patch.connect([multiply.outs[0], dac.ins[1]])

# Save the patch
patch.save("AM7.maxpat")