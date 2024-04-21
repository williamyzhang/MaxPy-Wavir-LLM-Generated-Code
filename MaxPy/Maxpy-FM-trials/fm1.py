import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Place a cycle~ object to generate a sine wave
sinewave = patch.place("cycle~ 440", num_objs=1, starting_pos=[100, 100])[0]

# Place a cycle~ object for modulating frequency
modulator = patch.place("cycle~ 220", num_objs=1, starting_pos=[100, 150])[0]

# Place a *~ object for frequency modulation
multiplier = patch.place("*~ 100", num_objs=1, starting_pos=[100, 200])[0]

# Place a +~ object to add the modulation signal to the carrier frequency
adder = patch.place("+~ 440", num_objs=1, starting_pos=[100, 250])[0]

# Place a cycle~ object as the final oscillator
oscillator = patch.place("cycle~", num_objs=1, starting_pos=[100, 300])[0]

# Place a *~ object to control the amplitude
amplitude = patch.place("*~ 0.5", num_objs=1, starting_pos=[100, 350])[0]

# Place a dac~ object to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[100, 400])[0]

# Connect the modulator to the multiplier
patch.connect([modulator.outs[0], multiplier.ins[0]])

# Connect the multiplier to the adder
patch.connect([multiplier.outs[0], adder.ins[0]])

# Connect the adder to the oscillator's frequency
patch.connect([adder.outs[0], oscillator.ins[0]])

# Connect the oscillator to the amplitude control
patch.connect([oscillator.outs[0], amplitude.ins[0]])

# Connect the amplitude control to the dac~
patch.connect([amplitude.outs[0], dac.ins[0]])

# Save the patch with a name
patch.save("fm1.maxpat")