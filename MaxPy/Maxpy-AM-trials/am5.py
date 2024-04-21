import maxpy as mp

# Initialize a new Max patch.
patch = mp.MaxPatch()

# Create a cycle~ object to generate our carrier sine wave. By default, cycle~ oscillates at 440Hz.
carrier_freq = 440
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create a cycle~ object for the modulation. Let's modulate at a lower frequency for a clear AM effect.
modulation_freq = 10
modulator = patch.place(f"cycle~ {modulation_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Create a *~ object for amplitude modulation. This will multiply our carrier and modulation signals.
am_operator = patch.place("*~", num_objs=1, starting_pos=[300, 150])[0]

# Create an ezdac~ object to send the output to the speakers.
out = patch.place("ezdac~", num_objs=1, starting_pos=[500, 150])[0]

# Connect modulator to the left inlet of the *~ object to modulate the amplitude of the carrier.
patch.connect([modulator.outs[0], am_operator.ins[0]])

# Connect carrier to the *~ object for modulation.
patch.connect([carrier.outs[0], am_operator.ins[1]])

# Finally, connect the AM operator to ezdac~ to output the sound.
patch.connect([am_operator.outs[0], out.ins[0]])

# Save the patch.
patch.save("am5.maxpat")