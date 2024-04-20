import maxpy as mp

patch = mp.MaxPatch()

# Base frequency for the sine wave
base_freq = 220  # A3 note

# Create the base sine wave oscillator
base_osc = patch.place(f"cycle~ {base_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Create 4 additional sine wave oscillators for the partials
partials = []
for partial_num in range(1, 5):  # From 1x to 4x the base frequency
    partial_freq = base_freq * (partial_num + 1)  # Partial frequencies (2x, 3x, 4x, 5x)
    partial_osc = patch.place(f"cycle~ {partial_freq}", num_objs=1, starting_pos=[100 + (partial_num*100), 100])[0]
    partials.append(partial_osc)

# Mixer to combine the base oscillator with the partials
mix = patch.place("*~ 0.2", num_objs=5, starting_pos=[100, 300])  # Reduce the amplitude to avoid clipping

# Connect base oscillator and partials to the mixer inputs
patch.connect([base_osc.outs[0], mix[0].ins[0]])
for i, partial in enumerate(partials):
    patch.connect([partial.outs[0], mix[i+1].ins[0]])

# Output to ezdac~
ezdac = patch.place("ezdac~", num_objs=1, starting_pos=[100, 400])[0]
for mix_out in mix:
    patch.connect([mix_out.outs[0], ezdac.ins[0]])
    patch.connect([mix_out.outs[0], ezdac.ins[1]])  # Connect to both left and right channels

patch.save("add8.maxpat")