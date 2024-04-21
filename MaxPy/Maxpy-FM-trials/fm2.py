import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place a cycle~ object to serve as our carrier oscillator
# The carrier frequency is set to 440 Hz (A4 note)
carrier_freq = 440
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Place another cycle~ object to serve as our modulator oscillator
# Let's set the modulation frequency to 220 Hz for this example
modulation_freq = 220
modulator = patch.place(f"cycle~ {modulation_freq}", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object to adjust the modulation depth
# This will control how much the modulator affects the carrier
mod_depth = 100  # Modulation depth in Hz
mod_depth_control = patch.place(f"*~ {mod_depth}", num_objs=1, starting_pos=[300, 200])[0]

# Connect the modulator to the modulation depth control
patch.connect([modulator.outs[0], mod_depth_control.ins[0]])

# Place a +~ object to sum the modulator signal with the carrier frequency
sum_signal = patch.place("+~", num_objs=1, starting_pos=[500, 150])[0]

# Connect the carrier to the first input of the +~ object
patch.connect([carrier.outs[0], sum_signal.ins[0]])

# Connect the modulation depth control to the second input of the +~ object
patch.connect([mod_depth_control.outs[0], sum_signal.ins[1]])

# Place a dac~ object to output the sound
output = patch.place("dac~", num_objs=1, starting_pos=[700, 150])[0]

# Connect the sum_signal to the output
patch.connect([sum_signal.outs[0], output.ins[0]])
patch.connect([sum_signal.outs[0], output.ins[1]])

# Save the patch
patch.save("fm2.maxpat")