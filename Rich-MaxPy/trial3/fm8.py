import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Number of modulator and carrier pairs
num_pairs = 5

# Starting position for the first object
starting_x = 100
starting_y = 100

# Loop to create modulator and carrier sine wave cycles
for i in range(num_pairs):
    # Modulator frequency randomly chosen between 50 and 500 Hz
    mod_freq = random.randint(50, 500)
    # Carrier frequency randomly chosen between 200 and 1000 Hz
    carrier_freq = random.randint(200, 1000)

    # Create a modulator cycle~ object
    mod = patch.place(f"cycle~ {mod_freq}", num_objs=1, starting_pos=[starting_x, starting_y + i * 200])[0]
    # Create a carrier cycle~ object with a base frequency of 220 Hz
    carrier = patch.place("cycle~ 220", num_objs=1, starting_pos=[starting_x + 200, starting_y + i * 200])[0]

    # Create a *~ object to modulate the amplitude of the modulator
    amp_mod = patch.place("*~ 100", num_objs=1, starting_pos=[starting_x, starting_y + 50 + i * 200])[0]
    # Create a +~ object to add the modulation to the carrier frequency
    add_freq = patch.place(f"+~ {carrier_freq}", num_objs=1, starting_pos=[starting_x + 200, starting_y + 50 + i * 200])[0]

    # Connect modulator to *~ object
    patch.connect([mod.outs[0], amp_mod.ins[0]])
    # Connect *~ object to +~ object
    patch.connect([amp_mod.outs[0], add_freq.ins[0]])
    # Connect +~ object to carrier frequency inlet
    patch.connect([add_freq.outs[0], carrier.ins[0]])

# Output the final patched signal
outlet = patch.place("dac~", num_objs=1, starting_pos=[starting_x + 400, starting_y])[0]

# Connect the last carrier to the dac~
patch.connect([carrier.outs[0], outlet.ins[0]])

# Save the patch
patch.save("fm8.maxpat")
