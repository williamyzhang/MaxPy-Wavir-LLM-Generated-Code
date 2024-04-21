import maxpy as mp

# Create a new MaxPatch object
patch = mp.MaxPatch()

# Create the main sine wave oscillator
main_osc = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Create partial oscillators
partials_freq_multiplier = [2, 3, 4, 5]  # The frequency multipliers for the partials
partials = []
for i, multiplier in enumerate(partials_freq_multiplier):
    # To achieve additive synthesis, we create additional oscillators for the partials
    partial_osc = patch.place(f"cycle~ {440 * multiplier}", num_objs=1, starting_pos=[100, 150 + (i * 50)])[0]
    partials.append(partial_osc)

# Create a gain object to control the output level of the patch
gain = patch.place("*~ 0.2", num_objs=1, starting_pos=[100, 400])[0]

# Connect the main sine wave oscillator to the gain object
patch.connect([main_osc.outs[0], gain.ins[0]])

# Connect all partial oscillators to the same gain object
for partial in partials:
    patch.connect([partial.outs[0], gain.ins[0]])

# Create a dac~ object to send the output to the soundcard
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 450])[0]

# Connect the gain object to both inputs of the dac~ object ensuring stereo sound
patch.connect([gain.outs[0], dac.ins[0]])
patch.connect([gain.outs[0], dac.ins[1]])

# Save the patch
patch.save("add5.maxpat")