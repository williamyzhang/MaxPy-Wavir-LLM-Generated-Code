import maxpy as mp
import random

# Create a new patch
patch = mp.MaxPatch()

# Set parameters for the wave simulation
num_waves = 10  # Number of wave sounds to simulate
starting_y = 0

# Use a combination of noise~ and filter objects to simulate ocean waves
for i in range(num_waves):
    # Generate a random frequency within a plausible range for ocean wave sounds
    freq = random.uniform(100, 200)

    # Generate a random resonance value
    resonance = random.uniform(0.2, 0.8)

    # Noise generator
    noise = patch.place("noise~", num_objs=1, starting_pos=[100 * i, starting_y])[0]
    
    # Filter to sculpt the noise into a more wave-like sound
    filter = patch.place(f"svf~ {freq} {resonance}", num_objs=1, starting_pos=[100 * i, starting_y + 50])[0]
    
    # Gain control (so it's not too loud)
    gain = patch.place("gain~", num_objs=1, starting_pos=[100 * i, starting_y + 100])[0]
    
    # Connect the objects
    patch.connect([noise.outs[0], filter.ins[0]])
    patch.connect([filter.outs[0], gain.ins[0]])

# Save the patch
patch.save("waves4.maxpat")
