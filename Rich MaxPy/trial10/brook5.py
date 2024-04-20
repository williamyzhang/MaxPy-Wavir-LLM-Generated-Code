import maxpy as mp
import random

patch = mp.MaxPatch()

# Constants
numStreams = 5  # Number of parallel streams to simulate

# Noise generators for water stream sounds
noiseLevels = [random.randint(200, 500) for _ in range(numStreams)]
noiseGens = patch.place("noise~", num_objs=numStreams, starting_pos=[0, 0])

# Filters (simulating water hitting rocks and changes in flow)
filterParams = [(random.randint(200, 800), random.uniform(0.2, 0.7)) for _ in range(numStreams)]
filters = [patch.place(f"svf~ {freq} {res}", num_objs=1, starting_pos=[100, index * 150])[0] for index, (freq, res) in enumerate(filterParams)]

# Random panning for stereo spread - simulating the randomness in direction of water flow
panPositions = [random.uniform(0.0, 1.0) for _ in range(numStreams)]
pans = [patch.place(f"pan2 {pos}", num_objs=1, starting_pos=[200, index * 150])[0] for index, pos in enumerate(panPositions)]

# Gain control for volume variations - simulating the variations in water intensity
gains = [patch.place("gain~", num_objs=1, starting_pos=[300, index * 150])[0] for index in range(numStreams)]

# Connect each stream's components
for noise, filt, pan, gain in zip(noiseGens, filters, pans, gains):
    patch.connect([noise.outs[0], filt.ins[0]])
    patch.connect([filt.outs[0], pan.ins[0]])
    patch.connect([pan.outs[0], gain.ins[0]])

# Output to dac~ for play back
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 0])[0]
for gain in gains:
    patch.connect([gain.outs[0], dac.ins[0]])
    patch.connect([gain.outs[0], dac.ins[1]])

patch.save("brook5.maxpat")
