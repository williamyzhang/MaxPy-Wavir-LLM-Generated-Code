import maxpy as mp
import random

# Create a new MaxPatch object
patch = mp.MaxPatch()

# Function to create a white noise source with a low-pass filter
def create_noise_source(start_pos):
    # Create white noise
    noise = patch.place("noise~", num_objs=1, starting_pos=start_pos)[0]
    # Create a low-pass filter with random center frequency to simulate wave sound variety
    freq = random.randint(200, 600)  # Center frequency range
    resonance = random.uniform(0.2, 0.5)  # Resonance range
    filter = patch.place(f"svf~ {freq} {resonance}", num_objs=1, starting_pos=[start_pos[0] + 100, start_pos[1]])[0]
    # Connect noise to the filter
    patch.connect([noise.outs[0], filter.ins[0]])
    return filter

# Function to create a simple modulated amplitude controller
def create_amp_mod(start_pos, min_amp=0.2, max_amp=0.5):
    # Random frequency for our LFO (Low Frequency Oscillator) to modulate the amplitude
    lfo_freq = random.uniform(0.2, 0.8)
    lfo = patch.place(f"cycle~ {lfo_freq}", num_objs=1, starting_pos=start_pos)[0]
    # Setting amplitude range
    scale = patch.place(f"*~ {max_amp - min_amp}", num_objs=1, starting_pos=[start_pos[0] + 100, start_pos[1]])[0]
    offset = patch.place(f"+~ {min_amp}", num_objs=1, starting_pos=[start_pos[0] + 200, start_pos[1]])[0]
    # Connect LFO to scale, then to offset
    patch.connect([lfo.outs[0], scale.ins[0]])
    patch.connect([scale.outs[0], offset.ins[0]])
    return offset

# Creating multiple noise sources modulated by LFOs to simulate waves
num_waves = 5
start_x = 10
start_y = 10
spacing = 150

for i in range(num_waves):
    start_pos = [start_x, start_y + i * spacing]
    filter = create_noise_source(start_pos)
    amp_mod = create_amp_mod([start_pos[0] + 100, start_pos[1]])
    
    # Connect the filtered noise to the amplitude modulator
    patch.connect([filter.outs[0], amp_mod.ins[0]])
    
    # Connect to the output
    output = patch.place("dac~", num_objs=1, starting_pos=[start_pos[0] + 400, start_pos[1]])[0]
    patch.connect([amp_mod.outs[0], output.ins[0]])
    
# Save the patch
patch.save("waves6.maxpat")
