import maxpy as mp
import random

# Initialize MaxPatch
patch = mp.MaxPatch()

# Parameters for bird call simulation
num_chirps = random.randint(5, 10)  # Random number of chirps
starting_pos = [50, 100]  # Starting position for the first object

# Metro object to control the timing of bird calls
metro = patch.place("metro " + str(random.randint(200, 1000)), num_objs=1, starting_pos=[starting_pos[0], starting_pos[1]-100])[0]

# Counter object to iterate through the chirps
counter = patch.place("counter " + str(num_chirps) + " 1", num_objs=1, starting_pos=[starting_pos[0] + 100, starting_pos[1]-100])[0]

# Create cycle~ objects for generating tones
chirps = []
for i in range(num_chirps):
    freq = random.randint(500, 2000)  # Frequency for the bird chirp
    chirp = patch.place("cycle~ " + str(freq), num_objs=1, starting_pos=[starting_pos[0], starting_pos[1] + i*50])[0]
    chirps.append(chirp)

# Random object for pitch variation
pitch_variation = patch.place("random " + str(random.randint(100, 500)), num_objs=1, starting_pos=[-50, starting_pos[1]])[0]

# Connection of metro to counter and pitch_variation
patch.connect([metro.outs[0], counter.ins[0]])
patch.connect([pitch_variation.outs[0], metro.ins[0]])

# Connecting counter to each chirp with varying amplitudes and pitches using sah~
for i, chirp in enumerate(chirps):
    adsr = patch.place("adsr~ 0.1 0.2 0.5 0.3", num_objs=1, starting_pos=[starting_pos[0] + (i+1)*200, starting_pos[1] + i*50])[0]
    sah = patch.place("sah~", num_objs=1, starting_pos=[starting_pos[0] + (i+1)*300, starting_pos[1] + i*50])[0]
    patch.connect([counter.outs[0], chirp.ins[0]])
    patch.connect([chirp.outs[0], adsr.ins[0]])
    patch.connect([adsr.outs[0], sah.ins[0]])
    patch.connect([sah.outs[0], chirp.ins[0]])
    if i % 2 == 0:
        patch.connect([pitch_variation.outs[0], sah.ins[1]])

# Save the patch
patch.save("bird8.maxpat")
