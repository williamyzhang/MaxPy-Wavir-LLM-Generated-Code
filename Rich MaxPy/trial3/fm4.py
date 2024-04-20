import maxpy as mp
import random

# Initialize patch
patch = mp.MaxPatch()

# Frequencies for the carrier and modulator oscillators
base_freq = 440  # Base frequency for carrier in Hz
mod_range = [0.5, 50]  # Modulation frequency range in Hz

num_osc = 10  # Number of FM pairs to generate

# Generate carrier and modulator oscillator pairs
for i in range(num_osc):
    carrier_freq = base_freq + i * 110  # Increment carrier frequency for each pair
    modulator_freq = random.uniform(*mod_range)  # Random modulator frequency within specified range

    # Place cycle~ objects (sine wave oscillators) for carrier and modulator
    carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[50, i*100 + 50])[0]
    modulator = patch.place(f"cycle~ {modulator_freq}", num_objs=1, starting_pos=[300, i*100 + 50])[0]

    # Place *~ objects for frequency modulation
    fm = patch.place("*~ 100", num_objs=1, starting_pos=[150, i*100 + 75])[0]
    
    # Connect modulator to *~ object
    patch.connect([modulator.outs[0], fm.ins[0]])

    # Place a +~ object to add modulated signal to the carrier frequency
    add = patch.place("+~", num_objs=1, starting_pos=[450, i*100 + 50])[0]

    # Connect carrier and modulated signal to +~ object
    patch.connect([carrier.outs[0], add.ins[0]])
    patch.connect([fm.outs[0], add.ins[1]])

    # Place a dac~ object for audio output
    dac = patch.place("dac~", num_objs=1, starting_pos=[600, 100])[0]

    # Connect the +~ object's output to both left and right inputs of the dac~ object for stereo output
    patch.connect([add.outs[0], dac.ins[0]])
    patch.connect([add.outs[0], dac.ins[1]])

# Save the patch
patch.save("fm4.maxpat")
