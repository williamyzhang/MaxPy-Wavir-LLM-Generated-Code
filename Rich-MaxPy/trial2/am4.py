import maxpy as mp
import random

# Initialize a new Max patch
patch = mp.MaxPatch()

# Carrier and Modulator frequency ranges
carrier_freq_range = (220, 880)  # Hz
modulator_freq_range = (0.1, 10)  # Hz (for AM synthesis, modulator freq is usually lower than carrier)

# Number of carrier and modulator oscillator pairs
num_osc_pairs = 5

# Create carrier and modulator oscillators with random frequencies within defined ranges
carriers = []
modulators = []
for i in range(num_osc_pairs):
    carrier_freq = random.uniform(*carrier_freq_range)
    modulator_freq = random.uniform(*modulator_freq_range)
    carrier = patch.place(f"cycle~ {carrier_freq}", starting_pos=[100 * i, 100])
    modulator = patch.place(f"cycle~ {modulator_freq}", starting_pos=[100 * i, 200])
    carriers.append(carrier)
    modulators.append(modulator)

# AM synthesis: Multiply each carrier signal with its corresponding modulator signal
multipliers = []
for i, (carrier, modulator) in enumerate(zip(carriers, modulators)):
    multiplier = patch.place("*~", starting_pos=[100 * i, 300])
    multipliers.append(multiplier)
    patch.connect([carrier[0].outs[0], multiplier[0].ins[0]])
    patch.connect([modulator[0].outs[0], multiplier[0].ins[1]])

# Output the mixed signal of all AM modulated signals
mix = patch.place("mix~", num_objs=1, starting_pos=[100, 400])[0]
for i, multiplier in enumerate(multipliers):
    patch.connect([multiplier[0].outs[0], mix.ins[i]])

# Output to DAC~
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 500])[0]
patch.connect([mix.outs[0], dac.ins[0]])
patch.connect([mix.outs[0], dac.ins[1]])

# Save the Max patch
patch.save("am4.maxpat")
