import maxpy as mp

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Create metro object to trigger the bell sound at intervals (here set to every 2000ms)
metro = patch.place("metro 2000", num_objs=1, starting_pos=[0,0])[0]

# Create a toggle to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[0,-60])[0]

# Create cycle~ object to generate a sine wave tone, similar to a bell's fundamental frequency
cycle = patch.place("cycle~ 329.63", num_objs=1, starting_pos=[0,60])[0] # Using E4 (329.63 Hz) as an example frequency

# Create an envelope for the bell sound (decay)
# Using line~ object with specifically crafted message to simulate bell's decay
envelope = patch.place("line~", num_objs=1, starting_pos=[0,120])[0]
message = patch.place("message 1, 0.4 1000, 0 3000", num_objs=1, starting_pos=[-60,120])[0] # Fast rise and slow decay envelope

# Create a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[0,240])[0]

# Connect objects
patch.connect([toggle.outs[0], metro.ins[0]]) # Toggle to Metro
patch.connect([metro.outs[0], message.ins[0]]) # Metro to Message
patch.connect([message.outs[0], envelope.ins[0]]) # Message to Envelope
patch.connect([cycle.outs[0], envelope.ins[1]]) # Cycle~ to Envelope
patch.connect([envelope.outs[0], dac.ins[0]]) # Envelope to dac~
patch.connect([envelope.outs[0], dac.ins[1]]) # Connect to both channels of dac~

# Save the patch
patch.save("bell2.maxpat")