import maxpy as mp
import random

# Create a new Max patch
patch = mp.MaxPatch()

# Parameters
numWaves = 5  # Number of wave sounds to simulate
starting_pos = [50, 100]  # Starting position for object placement

# Create objects for simulating ocean waves
for i in range(numWaves):
    # Sine wave generator with random frequency for the sound of a wave
    frequency = random.randint(100, 300)  # Frequency between 100 and 300 Hz
    sine_wave = patch.place(f"cycle~ {frequency}", num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + i * 100])[0]

    # White noise generator to simulate the sound of water
    noise = patch.place("noise~", num_objs=1, starting_pos=[starting_pos[0] + 100, starting_pos[1] + i * 100])[0]

    # Low-pass filter to smooth out the sound, simulating water's fluidity
    center_frequency = random.uniform(500, 800)  # Center frequency between 500 and 800 Hz
    resonance = random.uniform(0.2, 0.5)  # Resonance between 0.2 and 0.5
    filter = patch.place(f"svf~ {center_frequency} {resonance}", num_objs=1, starting_pos=[starting_pos[0] + 200, starting_pos[1] + i * 100])[0]

    # Gain control for adjusting wave sound levels
    gain = patch.place("*~ 0.1", num_objs=1, starting_pos=[starting_pos[0] + 300, starting_pos[1] + i * 100])[0]

    # Patch connections
    patch.connect([sine_wave.outs[0], filter.ins[0]])
    patch.connect([noise.outs[0], filter.ins[0]])
    patch.connect([filter.outs[0], gain.ins[0]])  

# Save the Max patch with a name
patch.save("ocean_waves.maxpat")
