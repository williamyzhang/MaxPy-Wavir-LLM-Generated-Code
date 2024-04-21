import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Number of wave sounds to simulate
numWaves = 5

# Starting position for placing objects will be updated dynamically for layout
starting_pos = [10, 10]

# Create white noise sources to simulate water sound
for i in range(numWaves):
    # Randomize frequency and resonance for variety in wave sounds
    center_frequency = random.randint(400, 1200)
    resonance = random.uniform(0.1, 0.5)
    
    # Create white noise generator
    noise = patch.place("noise~", num_objs=1, starting_pos=starting_pos)[0]
    
    # Create a filter with randomized parameters for each wave
    filter_params = "svf~ {} {}".format(center_frequency, resonance)
    filter = patch.place(filter_params, num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 40])[0]
    
    # Connect noise generator to filter
    patch.connect([noise.outs[0], filter.ins[0]])
    
    # Pan each wave sound to give a stereo effect
    pan_pos = random.uniform(0, 1)  # Random panning position
    panner = patch.place("panner~ {}".format(pan_pos), num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 80])[0]
    
    # Connect filter output to panner
    patch.connect([filter.outs[0], panner.ins[0]])

    # Update starting position for the next wave
    starting_pos[1] += 150  # Move down for the next set of objects

# Outs to dac~ for playback
dac = patch.place("dac~", num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + 40])[0]

# Connect the last panner to the dac~ for playback
patch.connect([panner.outs[0], dac.ins[0]])
patch.connect([panner.outs[1], dac.ins[1]])

# Save the Max patch
patch.save("waves7.maxpat")
