import maxpy as mp

# Create a new Max patch
patch = mp.MaxPatch()

# Creating objects for the bird call patch
# A metro object to trigger bangs at a specified interval, simulating the call timing.
metro = patch.place("metro 500", num_objs=1, starting_pos=[0, 0])[0]

# A toggle to start/stop the metro object
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]

# Random object to generate random pitches within a bird-call like frequency range
random = patch.place("random 1000", num_objs=1, starting_pos=[150, 0])[0]
plus = patch.place("+ 500", num_objs=1, starting_pos=[150, 100])[0] # Adding base frequency

# Oscillator for generating sound, frequency modulated by the random object for pitch variance
osc = patch.place("cycle~", num_objs=1, starting_pos=[300, 100])[0]

# Adding noise for texture, simulating the breath or wind component in bird calls
noise = patch.place("noise~", num_objs=1, starting_pos=[300, 200])[0]

# An ADSR envelope to shape the bird call, making it more natural sounding
adsr = patch.place("adsr 50 300 0.5 300", num_objs=1, starting_pos=[0, 300])[0]

# Mixer to combine oscillator and noise signals
mix = patch.place("*~ 0.6", num_objs=2, starting_pos=[450, 100])[0]

# Speaker output
dac = patch.place("dac~", num_objs=1, starting_pos=[600, 100])[0]

# Connections
patch.connect([toggle.outs[0], metro.ins[0]])
patch.connect([metro.outs[0], random.ins[0]])
patch.connect([random.outs[0], plus.ins[0]])
patch.connect([plus.outs[0], osc.ins[0]])
patch.connect([metro.outs[0], adsr.ins[0]])
patch.connect([osc.outs[0], mix.ins[0]])
patch.connect([noise.outs[0], mix.ins[1]])
patch.connect([mix.outs[0], dac.ins[0]])
patch.connect([adsr.outs[0], mix.ins[2]])
patch.connect([adsr.outs[0], mix.ins[3]])

# Save the patch
patch.save("bird2.maxpat")