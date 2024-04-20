import maxpy as mp
import random

# Initialize MaxPatch
patch = mp.MaxPatch()

# Patch generation for a Telephone Dial Tone
# Telephone dial tone frequencies
dial_tone_frequencies = [(350, 440)]  # Standard dial tone frequencies in Hz

# Create cycle~ objects to generate sinusoidal tones at dial tone frequencies
cycle_objs = []
for freq_pair in dial_tone_frequencies:
    cycle1 = patch.place(f"cycle~ {freq_pair[0]}", starting_pos=[100, 100])[0]
    cycle2 = patch.place(f"cycle~ {freq_pair[1]}", starting_pos=[200, 100])[0]
    cycle_objs.append((cycle1, cycle2))

# Create a *~ object to control the amplitude of the signal, making it audible
amp = patch.place("*~ 0.1", starting_pos=[150, 200])[0]  # Lowering the amplitude to make it comfortable to listen

# Mix the signals from the two cycle~ objects for each frequency pair
for cycle_pair in cycle_objs:
    mixer = patch.place("+~", starting_pos=[150, 300])[0]
    patch.connect([cycle_pair[0].outs[0], mixer.ins[0]])
    patch.connect([cycle_pair[1].outs[0], mixer.ins[1]])
    
    # Connect mixed signal to the amplitude controller
    patch.connect([mixer.outs[0], amp.ins[0]])

# Route the signal to dac~ for output
dac = patch.place("dac~", starting_pos=[150, 400])[0]
patch.connect([amp.outs[0], dac.ins[0]])
patch.connect([amp.outs[0], dac.ins[1]])  # Connect to both left and right channels

# Save the patch
patch.save("dial9.maxpat")
