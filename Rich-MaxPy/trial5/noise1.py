import maxpy as mp
import random

patch = mp.MaxPatch()

# Place a metro object to trigger noise generation at regular intervals
metro = patch.place("metro 500", num_objs=1, starting_pos=[0, 0])[0]

# Generate white noise
noise = patch.place("noise~", num_objs=1, starting_pos=[0, 50])[0]

# Apply a low-pass filter at 1000 Hz to the noise
lpf = patch.place("filtergraph~ 1000 1.0", num_objs=1, starting_pos=[0, 100])[0]

# Create a gain control to adjust the output volume
gain = patch.place("gain~", num_objs=1, starting_pos=[0, 150])[0]

# Create an EZ-DAC for audio output
ezdac = patch.place("ezdac~", num_objs=1, starting_pos=[0, 200])[0]

# Connect objects
patch.connect([metro.outs[0], noise.ins[0]])
patch.connect([noise.outs[0], lpf.ins[0]])
patch.connect([lpf.outs[0], gain.ins[0]])
patch.connect([gain.outs[0], ezdac.ins[0]])
patch.connect([gain.outs[1], ezdac.ins[1]])

# Use for loop and random() to manipulate the cut-off frequency of the lpf dynamically
for i in range(1, 5):
    # Generate a random value for frequency cutoff within a reasonable audible range
    random_freq = random.randint(200, 2000)
    # Dynamically update the lpf cut-off frequency
    lpf = patch.place(f"filtergraph~ {random_freq} 1.0", num_objs=1, starting_pos=[i*100, 100])[i-1]

patch.save("noise1.maxpat")
