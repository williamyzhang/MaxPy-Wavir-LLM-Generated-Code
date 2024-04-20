import maxpy as mp
import random

# Initialize the MaxPy environment
patch = mp.MaxPatch()

# Create a carrier oscillator with a fixed frequency
carrier_freq = 440  # Frequency in Hz
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Specify the range for modulator frequencies and modulation depth
mod_freq_range = (50, 1000)  # Frequency range in Hz
mod_depth = 100  # Modulation depth in Hz

# Number of modulators
num_modulators = 3

# Initialize a list to hold modulator objects
modulators = []

# Use a for loop to create multiple modulators
for i in range(num_modulators):
    # Generate a random frequency within the specified range for the modulator
    mod_freq = random.randint(*mod_freq_range)

    # Create a modulator sine wave oscillator
    modulator = patch.place(f"cycle~ {mod_freq}", num_objs=1, starting_pos=[100, 200 + (i * 50)])[0]
    modulators.append(modulator)

    # Create a multiplication object to control modulation depth
    modulation_depth = patch.place(f"*~ {mod_depth}", num_objs=1, starting_pos=[250, 200 + (i * 50)])[0]

    # Connect the modulator to the modulation depth control
    patch.connect([(modulator.outs[0], modulation_depth.ins[0])])

# Create a `+~` object to sum the modulated frequencies
frequency_sum = patch.place("+~", num_objs=1, starting_pos=[400, 300])[0]

# Connect modulator outputs (after modulation depth control) to frequency sum
for modulation_depth in modulators:
    patch.connect([(modulation_depth.outs[0], frequency_sum.ins[0])])

# Finally, modulate the carrier's frequency with the composite modulated signal
patch.connect([(frequency_sum.outs[0], carrier.ins[0])])

# Save the patch with the name "fm_synth.maxpat"
patch.save("fm9.maxpat")
