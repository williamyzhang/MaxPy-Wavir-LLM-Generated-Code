import maxpy as mp
import random

patch = mp.MaxPatch()

# Primary sine wave oscillator
primary_freq = 440  # Frequency of the sine wave in Hz
cyc_primary = patch.place(f"cycle~ {primary_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Modulation sine wave oscillator with random frequency for AM
mod_freq = random.randint(1, 20)  # Random frequency between 1 Hz and 20 Hz for modulation
cyc_mod = patch.place(f"cycle~ {mod_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Multiplier for AM
multiply = patch.place("*~", num_objs=1, starting_pos=[100, 300])[0]

# Connection primary oscillator to multiplier
patch.connect([cyc_primary.outs[0], multiply.ins[0]])

# Connection modulation oscillator to multiplier
patch.connect([cyc_mod.outs[0], multiply.ins[1]])

# Add audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 400])[0]

# Connect the result of AM to the DAC for output
patch.connect([multiply.outs[0], dac.ins[0]])
patch.connect([multiply.outs[0], dac.ins[1]])

# Save the patch
patch.save("am2.maxpat")
