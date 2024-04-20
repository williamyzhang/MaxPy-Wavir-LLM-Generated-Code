import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Generate the main oscillator for the fundamental frequency
fundamental_freq = patch.place("cycle~ 220", num_objs=1, starting_pos=[100, 100])[0]

# Generate partial oscillators at frequencies above the fundamental
partials_freq_multiplier = [2, 3, 4, 5]
partials = []
for i, multiplier in enumerate(partials_freq_multiplier, start=1):
    partial_freq = 220 * multiplier  # Assuming 220 Hz as the fundamental frequency
    partial = patch.place(f"cycle~ {partial_freq}", num_objs=1, starting_pos=[100, (100 + 50 * i)])[0]
    partials.append(partial)

# Create a multiplying object for controlling amplitude of each oscillator
amplitudes = []
for i in range(len(partials) + 1):  # +1 for fundamental frequency
    amplitude = patch.place("*~ 0.2", num_objs=1, starting_pos=[250, (100 + 50 * i)])[0]  # setting a determined amplitude value
    amplitudes.append(amplitude)

# Connecting oscillators to their corresponding amplitude controllers
patch.connect([fundamental_freq.outs[0], amplitudes[0].ins[0]])
for i, partial in enumerate(partials):
    patch.connect([partial.outs[0], amplitudes[i+1].ins[0]])  # i+1 because the first amplitude is for the fundamental

# Creating a mixer to combine all signals
mix = patch.place("+~", num_objs=1, starting_pos=[400, 200])[0]

# Connecting all amplitude controlled signals to the mixer
for amplitude in amplitudes:
    patch.connect([amplitude.outs[0], mix.ins[0]])

# Finally, send the mixed signal to the output (assuming dac~ is for sound output)
dac = patch.place("dac~", num_objs=1, starting_pos=[550, 200])[0]
patch.connect([mix.outs[0], dac.ins[0]])

# Save the patch
patch.save("add10.maxpat")