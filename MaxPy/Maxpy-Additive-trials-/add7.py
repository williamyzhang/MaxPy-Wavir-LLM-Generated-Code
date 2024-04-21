import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Initialize the audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 500])[0]

# Fundamental frequency sine wave oscillator
fundamental_freq = 440  # Set the fundamental frequency to 440Hz
fundamental_sine = patch.place(f"cycle~ {fundamental_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Additive partials creation
partials = []
num_partials = 4
for i in range(num_partials):
    # Calculate frequency for each partial
    partial_freq = fundamental_freq * (i+2)  # Start from the second harmonic
    # Create partial oscillator
    partial = patch.place(f"cycle~ {partial_freq}", num_objs=1, starting_pos=[100, 150 + (i * 50)])[0]
    partials.append(partial)

# Mixer to combine the fundamental and partials
mixer = patch.place("*~ 0.2", num_objs=1, starting_pos=[300, 300])[0]  # Reduce amplitude to avoid clipping

# Connections
# Connect the fundamental frequency oscillator to the mixer
patch.connect([fundamental_sine.outs[0], mixer.ins[0]])

# Connect each partial to the mixer
for partial in partials:
    patch.connect([partial.outs[0], mixer.ins[0]])

# Connect the mixer to the audio output
patch.connect([mixer.outs[0], dac.ins[0]])
patch.connect([mixer.outs[0], dac.ins[1]])

# Save the MaxPatch
patch.save("add7.maxpat")