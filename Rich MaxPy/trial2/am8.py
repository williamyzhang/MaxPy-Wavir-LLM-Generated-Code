
import maxpy as mp
import random

patch = mp.MaxPatch()

# Carrier oscillator
carrier_freq = 220  # Carrier frequency in Hz
osc_carrier = patch.place(f"cycle~ {carrier_freq}", starting_pos=[100, 100])[0]

# Number of modulator oscillators
num_modulators = 5

# Initial positions for modulator oscillators
starting_x = 300
starting_y = 100
spacing_y = 50

# Create modulator oscillators with random frequencies and amplitudes
for i in range(num_modulators):
    mod_freq = random.randint(10, 100)  # Random frequency between 10 Hz and 100 Hz
    mod_amp = random.random()  # Random amplitude between 0.0 and 1.0
    osc_mod = patch.place(f"cycle~ {mod_freq}", starting_pos=[starting_x, starting_y + i * spacing_y])[0]
    multiplier = patch.place("*~", starting_pos=[starting_x + 100, starting_y + i * spacing_y])[0]
    patch.connect([osc_mod.outs[0], multiplier.ins[0]])
    patch.connect([osc_carrier.outs[0], multiplier.ins[1]])

    # Connect the modulated signal to a dac~ outlet to hear the result
    if i == num_modulators - 1:  # Only connect the last modulator to the output
        dac = patch.place("dac~", num_objs=1, starting_pos=[starting_x + 200, starting_y + i * spacing_y])[0]
        patch.connect([multiplier.outs[0], dac.ins[0]])

patch.save("am8.maxpat")
