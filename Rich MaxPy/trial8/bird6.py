import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of bird call pitches to generate
num_calls = 5
start_pos_y = 100

# Place a 'metro' object to trigger bird calls at a random rate
metro = patch.place("metro " + str(random.randint(200, 800)), num_objs=1, starting_pos=[0, start_pos_y])[0]

# Toggle to start/stop the metro
toggle = patch.place("toggle", num_objs=1, starting_pos=[0, start_pos_y - 50])[0]

# Connect the toggle to the metro
patch.connect([toggle.outs[0], metro.ins[0]])

for i in range(num_calls):
    # Generate random frequencies within a range for each call
    freq = random.randint(300, 1200)

    # Place 'cycle~' objects for generating sine waves with the random frequencies
    bird_call = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[i*150, start_pos_y*2])[0]

    # Place 'line~' objects to control the amplitude of the bird calls, simulating fade in/out
    line = patch.place("line~", num_objs=1, starting_pos=[i*150, start_pos_y*2 + 50])[0]
    
    # Place DAC~ for audio output
    dac = patch.place("dac~", num_objs=1, starting_pos=[i*150, start_pos_y*3 + 50])[0]

    # Random timing for calls activation
    random_delay = patch.place(f"delay {random.randint(10, 1000)}", num_objs=1, starting_pos=[i*150, start_pos_y + 50])[0]
    
    # Connect the metro to delay, then delay to cycle~ and line~
    patch.connect([metro.outs[0], random_delay.ins[0]])
    patch.connect([random_delay.outs[0], bird_call.ins[0]])
    patch.connect([random_delay.outs[0], line.ins[0]])
    
    # Connect line~ to cycle~ for amplitude control, then to dac~ for output
    patch.connect([line.outs[0], bird_call.ins[0]])
    patch.connect([bird_call.outs[0], dac.ins[0]])
    patch.connect([bird_call.outs[0], dac.ins[1]])

patch.save("bird6.maxpat")
