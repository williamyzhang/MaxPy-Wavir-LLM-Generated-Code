import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Create a metro object to trigger the bell sound at regular intervals
metro = patch.place("metro 2000", num_objs=1, starting_pos=[100, 100])[0]

# Create a toggle to start/stop the metro
tgl = patch.place("tgl", num_objs=1, starting_pos=[100, 50])[0]

# Connect the toggle to the metro
patch.connect([tgl.outs[0], metro.ins[0]])

# Create a counter to ensure only a single bell strike
counter = patch.place("counter 1 1", num_objs=1, starting_pos=[100, 200])[0]

# Connect metro to counter
patch.connect([metro.outs[0], counter.ins[0]])

# Create an object for bell volume (using the `line~` object to create a volume envelope)
vol_env = patch.place("line~", num_objs=1, starting_pos=[300, 300])[0]

# Connect counter to the volume envelope
patch.connect([counter.outs[0], vol_env.ins[0]])

# Create a message object to define the volume envelope
vol_msg = patch.place("message 0.8 200, 0 1000", num_objs=1, starting_pos=[200, 250])[0]

# Connect the message to the volume envelope
patch.connect([vol_msg.outs[0], vol_env.ins[0]])

# Create a cycle~ object to generate the tone
tone = patch.place("cycle~ 250", num_objs=1, starting_pos=[500, 300])[0]

# Create a resonant filter to model the bell's harmonic character
reson_filter = patch.place("reson~ 250 1 5", num_objs=1, starting_pos=[500, 400])[0]

# Connect the tone generator to the resonant filter
patch.connect([tone.outs[0], reson_filter.ins[0]])

# Create a multiplying object to control the amplitude of the sound
amp = patch.place("*~", num_objs=1, starting_pos=[500, 500])[0]

# Connect the volume envelope and resonant filter to the amplitude control
patch.connect([vol_env.outs[0], amp.ins[0]])
patch.connect([reson_filter.outs[0], amp.ins[1]])

# Create a dac~ to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 600])[0]

# Connect the amplitude control to the dac~
patch.connect([amp.outs[0], dac.ins[0]])
patch.connect([amp.outs[0], dac.ins[1]])

# Save the patch
patch.save("bell1.maxpat")