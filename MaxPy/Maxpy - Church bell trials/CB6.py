import maxpy as mp

# Create a new patch
patch = mp.MaxPatch()

# Place a cycle object to simulate the sound of the bell. 
frequency = 250  # A low, bell-like fundamental frequency
bell = patch.place(f"cycle~ {frequency}", starting_pos=[100, 100])[0]

# Add a gain control to adjust the volume of the bell sound
gain = patch.place("gain~", starting_pos=[200, 100])[0]

# Envelope generator to simulate the striking effect of a bell
envelope = patch.place("line~", starting_pos=[0, 200])[0]

# Message objects to control the envelope generator's behavior, simulating the striking effect
# Strike quickly then decay slowly to simulate bell striking
strike_msg = patch.place("message 1 0 1000", starting_pos=[0, 300])[0]

# Connect the envelope to the cycle~ object
patch.connect([envelope.outs[0], bell.ins[0]])

# Connect the message object to the envelope generator
patch.connect([strike_msg.outs[0], envelope.ins[0]])

# Connect the bell sound to the gain control
patch.connect([bell.outs[0], gain.ins[0]])

# Metro to continuously trigger the bell sound
metro = patch.place("metro 2000", starting_pos=[0, 400])[0]  # 2 seconds interval for bell strikes

# Toggle to start/stop the metro object
toggle = patch.place("toggle", starting_pos=[100, 400])[0]

# Connect the toggle to the metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Connect metro to trigger the message controlling the envelope
patch.connect([metro.outs[0], strike_msg.ins[0]])

# Save the Max Patch
patch.save("CB6.maxpat")