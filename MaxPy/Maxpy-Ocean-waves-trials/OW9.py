# Import MaxPy package and create a new Max patch
import maxpy as mp

patch = mp.MaxPatch()

# Create a pink~ noise object which is closer to the sound of the ocean
num_waves = 5  # Number of waves we want to simulate
start_y_position = 100  # Initial Y position for placement
for i in range(num_waves):
    # Create pink~ noise source
    pink_noise = patch.place("pink~", num_objs=1, starting_pos=[i*150, start_y_position])[0]
    
    # Create cycle~ objects to simulate the cyclical movement of waves with different low frequencies
    cycle = patch.place(f"cycle~ {0.1 + i*0.02}", num_objs=1, starting_pos=[i*150, start_y_position + 100])[0]
    
    # Create *~ objects to modulate the amplitude of the noise
    modulation = patch.place("*~", num_objs=1, starting_pos=[i*150, start_y_position + 200])[0]
    
    # Connect pink~ noise to left inlet of *~
    patch.connect([pink_noise.outs[0], modulation.ins[0]])
    
    # Connect cycle~ to right inlet of *~ to modulate the amplitude
    patch.connect([cycle.outs[0], modulation.ins[1]])
    
    # Create a lowpass filter with cutoff frequency around the range of 500Hz to smooth out the sound
    filter_freq = patch.place(f"filtergraph~ 500", num_objs=1, starting_pos=[i*150, start_y_position + 300])[0]
    
    # Connect the modulated noise to the filter
    patch.connect([modulation.outs[0], filter_freq.ins[0]])

# Finally, connect the output of the last filter to the dac~ for audio output
dac = patch.place("dac~", num_objs=1, starting_pos=[0, start_y_position + 400])[0]
for i in range(num_waves):
    patch.connect([filter_freq.outs[0], dac.ins[0]])
    patch.connect([filter_freq.outs[0], dac.ins[1]])

# Save the patch
patch.save("OW9.maxpat")