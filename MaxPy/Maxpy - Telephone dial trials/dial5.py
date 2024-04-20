from maxpy import Maxpy 

# Initialize Maxpy object
max_patch = Maxpy()

# Create two cycle~ objects for generating sinusoidal tones
osc1 = max_patch.add_object('cycle~', 350, xpos=100, ypos=50)  # Generates a 350 Hz tone
osc2 = max_patch.add_object('cycle~', 440, xpos=100, ypos=100) # Generates a 440 Hz tone

# Create a [*~] object to control the volume
volume = max_patch.add_object('*~', 0.5, xpos=200, ypos=75)

# Create a DAC~ object to output the sound
dac = max_patch.add_object('dac~', xpos=300, ypos=75)

# Connect the oscillators to the volume control
max_patch.connect(osc1, 0, volume, 0)
max_patch.connect(osc2, 0, volume, 1)

# Connect the volume control to the DAC~
max_patch.connect(volume, 0, dac, 0)
max_patch.connect(volume, 0, dac, 1)

# Save the patch to a file
max_patch.save('dial5.maxpat')