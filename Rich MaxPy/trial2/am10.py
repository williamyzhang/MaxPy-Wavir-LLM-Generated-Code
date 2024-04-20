
import maxpy as mp
import random

# Initialize MaxPatch
patch = mp.MaxPatch()

# Constants for our patch
carrier_freq = 440  # Carrier frequency in Hz
mod_index = 100  # Modulation Index, affects the depth of modulation
num_modulators = 5  # Number of modulators to create

# Place a cycle~ object for our Carrier
carrier = patch.place("cycle~ {}".format(carrier_freq), num_objs=1, starting_pos=[100, 100])[0]

# Generate several Modulators with random frequencies using a for loop
for i in range(num_modulators):
    # Generate a random frequency for the modulator between 0.1 to 20 Hz
    mod_freq = random.random() * 19.9 + 0.1
    # Place a cycle~ object for Modulation with a random frequency
    modulator = patch.place("cycle~ {}".format(mod_freq), num_objs=1, starting_pos=[100, 150 + i*50])[0]
    # Create an *~ object to multiply the modulator signal by the modulation index
    multiply = patch.place("*~ {}".format(mod_index), num_objs=1, starting_pos=[300, 150 + i*50])[0]
    # Patch modulator output to the *~ object input
    patch.connect([modulator.outs[0], multiply.ins[0]])
    # Create a +~ object to add the Carrier signal with the modulated signal
    add = patch.place("+~", num_objs=1, starting_pos=[500, 100 + i*100])[0]
    # Patch the Carrier and modulated signal to the +~ object
    patch.connect([carrier.outs[0], add.ins[0]])
    patch.connect([multiply.outs[0], add.ins[1]])

# Save the patch
patch.save("am10.maxpat")
