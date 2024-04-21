import maxpy as mp

# Create a new MaxPatch.
patch = mp.MaxPatch()

# Place a metro object to serve as our trigger for the bell sound, simulating the bell's periodic ringing.
# Set it to trigger every 2000 ms (2 seconds).
metro = patch.place("metro 2000", num_objs=1, starting_pos=[0, 0])[0]

# Place a toggle object to start/stop the metro object.
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]

# Creating an object to hold the MIDI note values of the church bell sound.
# These notes are typical of the harmonic series and will be chosen to emulate a bell's sound.
# For simplicity, we will use only a few harmonics.
bell_notes = patch.place("makenote 60 500", num_objs=1, starting_pos=[100, 150])[0]

# Place a cycle~ object to generate a sine wave tone corresponding to our bell notes.
cycle = patch.place("cycle~", num_objs=1, starting_pos=[100, 200])[0]

# Place a *~ object to modulate the amplitude of the bell sound, giving it a ringing effect.
# This object will be driven by a line~ object to create a decaying amplitude effect.
ring_amp = patch.place("*~", num_objs=1, starting_pos=[100, 250])[0]

# Placing a line~ object to create the amplitude modulation effect.
amp_mod = patch.place("line~", num_objs=1, starting_pos=[50, 300])[0]

# Connect the toggle to the metro object.
patch.connect([toggle.outs[0], metro.ins[0]])

# Connect the metro object to the makenote object.
patch.connect([metro.outs[0], bell_notes.ins[0]])

# Connect makenote to cycle~ object's frequency inlet.
patch.connect([bell_notes.outs[0], cycle.ins[0]])

# Connect the cycle~ output to the *~ object's signal inlet to modulate the bell sound.
patch.connect([cycle.outs[0], ring_amp.ins[0]])

# Connect the line~ object to the *~ object's amplitude modulation inlet.
patch.connect([amp_mod.outs[0], ring_amp.ins[1]])

# Save the Max patch with the name "church_bell.maxpat".
patch.save("CB8.maxpat")