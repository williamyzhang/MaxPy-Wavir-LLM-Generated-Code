import maxpy
import random

# Initialize MaxPy patch
patch = maxpy.MaxPatch('FilteredWhiteNoise.maxpat')

# Create a [noise~] object for white noise generation
noise_obj = patch.create_object('noise~', 100, 100)

# Variables to store positions
x_base, y_base = 150, 100
x_offset, y_offset = 25, 75

# Create [biquad~] object for low-pass filtering with a preset frequency of 1000 Hz
biquad_obj = patch.create_object('biquad~', x_base + x_offset, y_base + 2 * y_offset)

# Create objects for filter setting (filtergraph~ for interactive definition of filter properties)
filtergraph_obj = patch.create_object('filtergraph~', x_base + x_offset * 3, y_base, 150, 150)
patch.connect(filtergraph_obj, 0, biquad_obj, 0)

# Create [filtercoeff~] object to dynamically generate coefficients for the [biquad~], 
# based on the parameters set in the [filtergraph~] and apply the low-pass filter at 1000 Hz
filtercoeff_obj = patch.create_object('filtercoeff~', x_base + 2 * x_offset, y_base + 2 * y_offset)
patch.create_message(filtercoeff_obj, 'args lowpass 1000')  # Set the filter type and frequency

# Connect [filtercoeff~] to [biquad~]
patch.connect(filtercoeff_obj, 0, biquad_obj, 1)
patch.connect(filtercoeff_obj, 0, biquad_obj, 2)
patch.connect(filtercoeff_obj, 0, biquad_obj, 3)
patch.connect(filtercoeff_obj, 0, biquad_obj, 4)

# Connect [noise~] to [biquad~]
patch.connect(noise_obj, 0, biquad_obj, 0)

# Create dac~ object for output
dac_obj = patch.create_object('dac~', x_base + 3 * x_offset, y_base + 3 * y_offset)
patch.connect(biquad_obj, 0, dac_obj, 0)  # Left channel
patch.connect(biquad_obj, 1, dac_obj, 1)  # Right channel

# Optionally, add random parameter adjustments here using for loops and/or random()

# Save the patch
patch.save()
