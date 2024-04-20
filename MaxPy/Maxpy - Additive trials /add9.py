import maxpy as mp

# Initialize a new MaxPy patch
patch = mp.MaxPatch()

# Base frequency for the fundamental sine wave
base_freq = 220

# Create a cycle~ object for the fundamental frequency (sine wave)
fundamental = patch.place(f"cycle~ {base_freq}", num_objs=1, starting_pos=[0, 0])[0]

# Create cycle~ objects for the 4 partials
partials = []
for i in range(1, 5):
    partial_frequency = base_freq * (i+1)  # Calculate the frequency of the partial
    partial = patch.place(f"cycle~ {partial_frequency}", num_objs=1, starting_pos=[100*i, 0])[0]
    partials.append(partial)

# Create an *~ object to adjust the volume of each oscillator to avoid clipping
# and to ensure the partials are at a lower volume than the fundamental
volume_controls = []
for i in range(5):
    volume_control = patch.place("*~ 0.2", num_objs=1, starting_pos=[i*100, 150])[0]
    volume_controls.append(volume_control)

# Connect the fundamental and partials to their respective volume controls
patch.connect([fundamental.outs[0], volume_controls[0].ins[0]])
for i, partial in enumerate(partials):
    patch.connect([partial.outs[0], volume_controls[i+1].ins[0]])

# Create a +~ object to sum the outputs of the volume controls
mixer = patch.place("+~", num_objs=1, starting_pos=[200, 300])[0]

# Connect volume controls to the mixer
for volume_control in volume_controls:
    patch.connect([volume_control.outs[0], mixer.ins[0]])

# Create a dac~ object to output the audio
output = patch.place("dac~", num_objs=1, starting_pos=[200, 450])[0]

# Connect the mixer to the output
patch.connect([mixer.outs[0], output.ins[0]])
patch.connect([mixer.outs[0], output.ins[1]])

# Save the patch
patch.save("add9.maxpat")