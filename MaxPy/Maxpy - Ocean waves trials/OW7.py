import maxpy as mp

# Initialize the MaxPatch object
patch = mp.MaxPatch()

# Number of noise waves to create for the effect
num_waves = 5

# Starting position for placing objects
start_pos = [50, 50]

# Loop to create multiple noise generators and their envelope controllers
for i in range(num_waves):
    # Calculate position for the current set of objects
    pos = [start_pos[0], start_pos[1] + i * 150]
    
    # Place a white noise generator
    noise = patch.place("white~", num_objs=1, starting_pos=pos)[0]
    
    # Place an object to dynamically control amplitude
    line = patch.place("line~", num_objs=1, starting_pos=[pos[0] + 100, pos[1]])[0]
    
    # Place a multiplier to apply the line~ control to the noise
    multiply = patch.place("*~", num_objs=1, starting_pos=[pos[0] + 200, pos[1]])[0]
    
    # Place a dac~ object to output sound
    if i == 0:
        dac = patch.place("dac~", num_objs=1, starting_pos=[pos[0] + 400, pos[1]])[0]
    
    # Connect the noise generator to the multiplier
    patch.connect([noise.outs[0], multiply.ins[0]])
    
    # Connect the dynamic line control to the multiplier
    patch.connect([line.outs[0], multiply.ins[1]])
    
    # Connect the multiplied signal to the dac~ for output
    patch.connect([multiply.outs[0], dac.ins[i % 2]])

# Saving the patch
patch.save("OW7.maxpat")