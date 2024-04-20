import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Define the base frequency for the bird call, and the number of variations
base_frequency = 1000  # in Hertz
num_variations = 5  # Number of variations in the bird call sequence

# Place a metro object to control the timing of bird calls
metro = patch.place("metro 500", num_objs=1, starting_pos=[0, 0])[0]

# Place a toggle object to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, -50])[0]

# Connect the toggle to the metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Loop to create multiple "cycle~" objects with varied frequencies to simulate bird calls
for i in range(num_variations):
    # Randomly adjust the frequency for each variation
    freq_variation = random.uniform(-200, 200)  # Random frequency variation between -200 and 200 Hz
    frequency = base_frequency + freq_variation
    
    # Place the cycle~ objects
    osc = patch.place(f"cycle~ {frequency}", num_objs=1, starting_pos=[100 * (i+1), 100])[0]
    
    # Connect the metro to the osc to control its triggering
    patch.connect([metro.outs[0], osc.ins[0]])

# Place a dac~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 300])[0]

# Connect all cycle~ objects to the dac~
for i in range(num_variations):
    osc_index = i + 1  # The first cycle~ object is at index 1, considering the previous objects placed
    osc = patch.objects[osc_index]  # Access the cycle~ object from the list of objects in the patch
    patch.connect([osc.outs[0], dac.ins[0]])  # Connect to the left channel of dac~
    patch.connect([osc.outs[0], dac.ins[1]])  # Connect to the right channel of dac~

# Save the patch with a given name
patch.save("bird1.maxpat")
