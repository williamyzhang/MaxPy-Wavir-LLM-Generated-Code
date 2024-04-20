import maxpy as mp
import random

# Initialize a new MaxPatch
patch = mp.MaxPatch()

# Constants for Dial Tone frequencies
DIAL_TONE_LOW_FREQ = 350  # Typical low frequency for a dial tone
DIAL_TONE_HIGH_FREQ = 440  # Typical high frequency for a dial tone
NUM_OSCILLATORS = 3  # Number of oscillators to simulate variability in tone
START_POS_Y_INIT = 100  # Initial y-coordinate to start placing objects in the patch

# Create a metro object to control the timing of the dial tone
metro = patch.place("metro 500", num_objs=1, starting_pos=[50, 0])[0]

# Create a toggle to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[50, -30])[0]

# Connect toggle to metro
patch.connect([toggle.outs[0], metro.ins[0]])

# Create oscillators for the dial tone
for i in range(NUM_OSCILLATORS):
    start_pos_y = START_POS_Y_INIT + (i * 50)  # Calculate y-coordinate for this oscillator
    freq = DIAL_TONE_LOW_FREQ if i % 2 == 0 else DIAL_TONE_HIGH_FREQ  # Alternate between low and high frequency
    freq_random_offset = random.uniform(-5, 5)  # Slight random frequency offset for realism
    cyc = patch.place(f"cycle~ {freq + freq_random_offset}", num_objs=1, starting_pos=[100, start_pos_y])[0]
    # Connect metro to oscillator to control its activation
    patch.connect([metro.outs[0], cyc.ins[0]])

# Create a DAC~ object to output the sound
dac = patch.place("dac~", num_objs=1, starting_pos=[300, START_POS_Y_INIT + ((NUM_OSCILLATORS - 1) * 50) / 2])[0]

# Connect all oscillators to the left and right inlets of dac~ for stereo output
for i in range(NUM_OSCILLATORS):
    start_pos_y = START_POS_Y_INIT + (i * 50)
    cyc = patch.place(f"cycle~ {DIAL_TONE_LOW_FREQ if i % 2 == 0 else DIAL_TONE_HIGH_FREQ}", 
                      num_objs=1, 
                      starting_pos=[100, start_pos_y])[0]
    patch.connect([cyc.outs[0], dac.ins[0]])  # Connect to left inlet
    patch.connect([cyc.outs[0], dac.ins[1]])  # Connect to right inlet

# Save the patch
patch.save("dial3.maxpat")
