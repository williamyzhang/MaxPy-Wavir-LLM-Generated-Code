import maxpy
import random

# Initialize MaxPy
max_patch = maxpy.MaxPatch()

# Generate unique IDs for objects using for loop or random value for varied positioning or parameters
for i in range(5):  # Creating 5 instances for a denser sound
    x_pos = 100 + i*100  # Increment x position for each object for visibility
    y_pos = random.randint(50, 300)  # Randomize y position
    
    # Create white noise source
    noise_id = f"noise_{i}"
    max_patch.add_object("noise~", noise_id, x_pos, y_pos)
    
    # Create low-pass filter at 1000Hz
    filter_id = f"filter_{i}"
    # Assuming a generic biquad~ filter usage; please adjust to specific MaxMSP filtering objects and attributes
    max_patch.add_object("biquad~", filter_id, x_pos+50, y_pos+50, args=[0.5, 0, -1, 0, 0])  # Sample biquad~ coefficients for a low-pass 
                                                                                             # filter setting; these are placeholders
    
    # Adjust filter cutoff frequency to 1000Hz (assuming `filtergraph~` or similar that allows straightforward freq setting;
    # Here using `message` as a placeholder for a frequency message, adjust based on actual implementation
    freq_id = f"freq_{i}"
    max_patch.add_object("message", freq_id, x_pos+50, y_pos+25, args=[1000])
    
    # Connect noise to filter
    max_patch.connect(noise_id, 0, filter_id, 0)

    # Connect filter frequency input (assuming correct inlet for frequency change, adjust as needed)
    max_patch.connect(freq_id, 0, filter_id, 1)

# Output setup
output_id = "dac~"
max_patch.add_object("dac~", output_id, 400, 350)

# Connect the last filter to output assuming stereo (connect more or differently as needed)
max_patch.connect(filter_id, 0, output_id, 0)  # Left channel
max_patch.connect(filter_id, 0, output_id, 1)  # Right channel

# Save the patch
max_patch.save("filtered_white_noise.maxpat")
