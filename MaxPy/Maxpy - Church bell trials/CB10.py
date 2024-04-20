import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place a toggle to start/stop the bell sound
tg = patch.place("toggle", num_objs=1, starting_pos=[100, 50])[0]

# Place a metro object to control the rate of note playing
metro = patch.place("metro 2000", num_objs=1, starting_pos=[100, 100])[0]

# Patch the toggle to the metro
patch.connect([tg.outs[0], metro.ins[0]])

# Frequency values that are common for church bells
bell_frequencies = [261.63, 329.63, 392.00, 523.25]  # These are examples. Modify for the desired tones.

# Create cycle~ objects for each frequency, simulating bell sounds
cycles = [patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[100, 150 + i * 100])[0] for i, freq in enumerate(bell_frequencies)]

# Patch the metro to trigger all the cycle~ objects
for cyc in cycles:
    patch.connect([metro.outs[0], cyc.ins[0]])

# Use line~ to control the decay of the bell's sound, making it resemble an actual bell
line = patch.place("line~", num_objs=1, starting_pos=[200, 500])[0]

# A gain object to control the overall output level
gain = patch.place("*~ 0.5", num_objs=1, starting_pos=[300, 550])[0]

# Patch the line to gain
patch.connect([line.outs[0], gain.ins[1]])

# Connect each cycle~ object to the gain
for cyc in cycles:
    patch.connect([cyc.outs[0], gain.ins[0]])

# A dac~ to hear the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[400, 600])[0]

# Patch the gain to dac
patch.connect([gain.outs[0], dac.ins[0]])
patch.connect([gain.outs[1], dac.ins[1]])

# Trigger the line~ object upon every metro bang to decay the sound
trigger = patch.place("t b 1000", num_objs=1, starting_pos=[200, 450])[0]
patch.connect([metro.outs[0], trigger.ins[0]])
patch.connect([trigger.outs[1], line.ins[0]])

# Save the patch
patch.save("CB10.maxpat")