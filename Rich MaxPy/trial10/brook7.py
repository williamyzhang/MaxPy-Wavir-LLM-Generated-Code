import maxpy as mp
import random

# Starting the patch
patch = mp.MaxPatch()

# Constants for the patch
numStreams = 5  # Number of parallel streams simulating different water flow paths
baseFrequency = 120  # Base frequency for babbling sounds
frequencyVariation = 80  # Variation range of frequencies to mimic the babbling effect

# Arrays to hold objects
noiseGens = []  # White noise generators
filters = []  # Low-pass filters to mold the white noise into babbling brook sounds
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 600])[0]  # DAC for output

# Loop to create the streams
for i in range(numStreams):
    # Place a white noise generator
    noise = patch.place("noise~", num_objs=1, starting_pos=[i*100, 100])[0]
    noiseGens.append(noise)
    
    # Place a low-pass filter with random center frequency within a defined range for variation
    centerFreq = baseFrequency + random.randint(-frequencyVariation // 2, frequencyVariation // 2)
    filter = patch.place(f"svf~ {centerFreq} 0.5", num_objs=1, starting_pos=[i*100, 200])[0]
    filters.append(filter)
    
    # Connect each noise generator to its corresponding filter
    patch.connect([(noise.outs[0], filter.ins[0])])

    # Connect each filter to both left and right channels of DAC
    patch.connect([(filter.outs[0], dac.ins[0])])
    patch.connect([(filter.outs[0], dac.ins[1])])

# Save the patch
patch.save("brook7.maxpat")
