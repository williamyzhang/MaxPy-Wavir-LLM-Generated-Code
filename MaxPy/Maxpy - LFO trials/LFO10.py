import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Place a cycle~ object (sine wave generator) with a default frequency
sine_wave = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Place an LFO (a low-frequency oscillator) to modulate the pitch of the sine wave
# We use the cycle~ object but with a frequency typical for an LFO (e.g., 5Hz)
lfo = patch.place("cycle~ 5", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object to control the depth of the vibrato effect (how much pitch variation)
depth = patch.place("*~ 10", num_objs=1, starting_pos=[300, 200])[0]

# Place a +~ object to add the modulation signal to the original frequency
mix = patch.place("+~ 440", num_objs=1, starting_pos=[500, 150])[0]

# Place a dac~ object to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[700, 100])[0]

# Connections
# Connect the LFO to the depth control
patch.connect([lfo.outs[0], depth.ins[0]])

# Connect the depth controlled LFO to the mix object to add the modulation to the base frequency
patch.connect([depth.outs[0], mix.ins[0]])

# Connect the mixed signal (original + modulation) to the sine wave generator's frequency
patch.connect([mix.outs[0], sine_wave.ins[0]])

# Connect the sine wave generator to the dac~ object to output the sound
patch.connect([sine_wave.outs[0], dac.ins[0]])
patch.connect([sine_wave.outs[0], dac.ins[1]])

# Save the patch
patch.save("LFO10.maxpat")