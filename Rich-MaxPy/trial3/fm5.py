import maxpy as mp
import random

# Initialize MaxPatch
patch = mp.MaxPatch()

# Number of oscillators to create
num_osc = 5

# Creating Carrier Oscillators
carrier_freqs = [random.randint(200, 400) for _ in range(num_osc)]
carrier_oscs = patch.place("cycle~", num_objs=num_osc, starting_pos=[100, 150])

# Creating Modulator Oscillators with random frequencies and modulation indices
mod_freqs = [random.randint(1, 10) for _ in range(num_osc)]
mod_indices = [random.randint(1, 100) for _ in range(num_osc)]
mod_oscs = patch.place("cycle~", num_objs=num_osc, starting_pos=[300, 150])

# Iterate over oscillators to set frequencies and connect them
for i in range(num_osc):
    mod_freq = mod_freqs[i]
    mod_index = mod_indices[i]
    
    # Place modulator oscillator with frequency and index
    modulator = mod_oscs[i]
    patch.place(f"expr {mod_freq} * {mod_index}", num_objs=1, starting_pos=[303 + i*50, 180])[0]
    
    # Setting frequencies of carrier oscillators
    carrier = carrier_oscs[i]
    patch.connect([modulator.outs[0], carrier.ins[0]])  # Connect modulator to carrier frequency

# Place output object to hear the sound
dac = patch.place("ezdac~", num_objs=1, starting_pos=[500, 150])[0]

# Connect the last carrier oscillator to the output
patch.connect([carrier_oscs[-1].outs[0], dac.ins[0]])
patch.connect([carrier_oscs[-1].outs[0], dac.ins[1]])

# Finally, save the Max patch
patch.save("fm5.maxpat")
