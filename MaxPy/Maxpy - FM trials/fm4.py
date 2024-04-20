import maxpy as mp

# Create a new patch
patch = mp.MaxPatch()

# Create a metro object to trigger bangs at a regular interval
metro = patch.place("metro 100", num_objs=1, starting_pos=[0, 0])[0]

# Create a toggle object to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[-50, 0])[0]

# Connect toggle to metro to control it
patch.connect([toggle.outs[0], metro.ins[0]])

# Modulator frequency slider
mod_freq = patch.place("slider", num_objs=1, starting_pos=[150, 0])[0]

# Carrier frequency slider
car_freq = patch.place("slider", num_objs=1, starting_pos=[300, 0])[0]

# Oscillator for modulation
mod_osc = patch.place("cycle~", num_objs=1, starting_pos=[150, 150])[0]

# Oscillator for carrier frequency
car_osc = patch.place("cycle~", num_objs=1, starting_pos=[300, 150])[0]

# Multiply modulator signal (for modulation index control)
mod_index = patch.place("*~ 100", num_objs=1, starting_pos=[150, 300])[0]

# Add modulated frequency to carrier frequency
freq_sum = patch.place("+~", num_objs=1, starting_pos=[300, 300])[0]

# Connect mod_freq slider to mod_osc frequency input
patch.connect([mod_freq.outs[0], mod_osc.ins[0]])

# Connect car_freq slider to freq_sum (this will be added to modulated signal)
patch.connect([car_freq.outs[0], freq_sum.ins[1]])

# Connect mod_osc output to mod_index for modulation depth
patch.connect([mod_osc.outs[0], mod_index.ins[0]])

# Connect mod_index output to freq_sum (add modulated signal to carrier frequency)
patch.connect([mod_index.outs[0], freq_sum.ins[0]])

# Connect freq_sum output (final FM signal) to car_osc's frequency input
patch.connect([freq_sum.outs[0], car_osc.ins[0]])

# Output the carrier oscillator to the dac~ for audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[450, 400])[0]
patch.connect([car_osc.outs[0], dac.ins[0]])
patch.connect([car_osc.outs[0], dac.ins[1]])

# Save your patch
patch.save("fm4.maxpat")
