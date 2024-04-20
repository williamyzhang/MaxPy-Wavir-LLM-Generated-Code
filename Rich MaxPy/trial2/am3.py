import maxpy as mp
import random

patch = mp.MaxPatch()

# Define the carrier frequency and amplitude
carrier_freq = 440  # Carrier frequency in Hz
carrier_amp = 0.5  # Carrier amplitude

# Create the carrier sine wave generator
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create a gain object to control the amplitude of the carrier signal
gain = patch.place(f"*~ {carrier_amp}", num_objs=1, starting_pos=[100, 200])[0]

# Connect the carrier to the gain object
patch.connect([carrier.outs[0], gain.ins[0]])

# Generate random frequencies for the modulator within a specified range
modulator_freqs = [random.randint(1, 20) for _ in range(5)]

# Modulator starting position
modulator_start_x = 300
modulator_start_y = 100

# Create multiple modulator sine wave generators with random frequencies
modulators = []
for i, freq in enumerate(modulator_freqs):
    modulators.append(patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[modulator_start_x, modulator_start_y + i*150])[0])

# Create a multiplier object to implement amplitude modulation
am_modulation = patch.place("*~", num_objs=1, starting_pos=[300, 350])[0]

# Connect the gain object to the multiplier to act as the carrier signal
patch.connect([gain.outs[0], am_modulation.ins[0]])

# Sum the modulator signals for a complex modulation effect and connect them to the multiplier
for modulator in modulators:
    patch.connect([modulator.outs[0], am_modulation.ins[1]])

# Create a dac~ object to output the sound to speakers
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 500])[0]

# Connect the modulation output to the dac~ object
patch.connect([am_modulation.outs[0], dac.ins[0]])
patch.connect([am_modulation.outs[0], dac.ins[1]])

# Save the MaxPatch
patch.save("am3.maxpat")
