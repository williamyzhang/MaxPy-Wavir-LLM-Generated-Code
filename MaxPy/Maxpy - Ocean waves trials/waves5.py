import maxpy as mp 

patch = mp.MaxPatch()

# Constants for later positioning adjustments
starting_x = 100
starting_y = 100

# Create a white noise generator
noise = patch.place("noise~", num_objs=1, starting_pos=[starting_x, starting_y])[0]

# Create a lowpass filter with a control for its frequency
filter_freq = patch.place("slide 50 50", num_objs=1, starting_pos=[starting_x + 150, starting_y])[0]
svf_filter = patch.place("svf~ @mode lowpass", num_objs=1, starting_pos=[starting_x + 150, starting_y + 50])[0]

# Generating varying frequency for the lowpass filter to simulate waves
line = patch.place("line~", num_objs=1, starting_pos=[starting_x + 150, starting_y + 100])[0]
random = patch.place("random 500", num_objs=1, starting_pos=[starting_x + 300, starting_y + 100])[0]
metro = patch.place("metro 2000", num_objs=1, starting_pos=[starting_x + 300, starting_y + 150])[0]
toggle = patch.place("toggle", num_objs=1, starting_pos=[starting_x + 300, starting_y])[0]

# Amplitude modulation to vary the wave's intensity over time
amp_line = patch.place("line~", num_objs=1, starting_pos=[starting_x + 450, starting_y + 100])[0]
amp_random = patch.place("random 30", num_objs=1, starting_pos=[starting_x + 600, starting_y + 100])[0]
amp_metro = patch.place("metro 2500", num_objs=1, starting_pos=[starting_x + 600, starting_y + 150])[0]
amp_toggle = patch.place("toggle", num_objs=1, starting_pos=[starting_x + 600, starting_y])[0]
amp_scale = patch.place("*~ 0.3", num_objs=1, starting_pos=[starting_x + 750, starting_y + 50])[0]

# Apply the lowpass filter to the noise
patch.connect([noise.outs[0], svf_filter.ins[0]])

# Connect the varying frequency to the lowpass filter
patch.connect([toggle.outs[0], metro.ins[0]])
patch.connect([metro.outs[0], random.ins[0]])
patch.connect([random.outs[0], line.ins[0]])
patch.connect([line.outs[0], filter_freq.ins[0]])
patch.connect([filter_freq.outs[0], svf_filter.ins[1]])

# Connect the amplitude modulation controls
patch.connect([amp_toggle.outs[0], amp_metro.ins[0]])
patch.connect([amp_metro.outs[0], amp_random.ins[0]])
patch.connect([amp_random.outs[0], amp_line.ins[0]])
patch.connect([amp_line.outs[0], amp_scale.ins[0]])
patch.connect([amp_scale.outs[0], svf_filter.ins[0]])

# Save the patch
patch.save("waves5.maxpat")