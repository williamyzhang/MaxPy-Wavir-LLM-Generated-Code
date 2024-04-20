import maxpy
import random

# Initialize MaxPy document
maxdoc = maxpy.MaxDocument()

# Generate a series of noise~ objects to simulate the sound of waves
for i in range(10):  # Create 10 patches that could simulate different waves
    # Positioning the objects with some randomness for a more natural distribution
    xpos = 100 + i*100
    ypos = 50 + random.randint(-10, 10)*10
    
    # Generate white noise
    noise = maxdoc.newdefault(xpos, ypos, "noise~")
    
    # Use a filter to vary the frequency content of the noise
    # Simulate waves at different distances and intensities
    filter_freq = random.randint(200, 1000)  # Frequency range for filter
    filter_res = random.randint(1, 5)  # Filter resonance
    biquad = maxdoc.newdefault(xpos, ypos + 50, "biquad~", filter_freq, 0.5, filter_res)
    
    # Connect noise to filter
    maxdoc.connect(noise, 0, biquad, 0)
    
    # Random volume control to simulate wave intensity
    amplitude = random.uniform(0.2, 0.8)  # Random amplitude for volume control
    gain = maxdoc.newdefault(xpos, ypos + 100, "gain~", amplitude)
    
    # Connect filter to gain
    maxdoc.connect(biquad, 0, gain, 0)
    
    # Connect to dac~ for output
    dac = maxdoc.newdefault(xpos, ypos + 150, "dac~")
    maxdoc.connect(gain, 0, dac, 1)  # Connect to both left and right channel
    maxdoc.connect(gain, 0, dac, 0)

# Save the generated MaxMSP patch
maxdoc.save_as("ocean_waves.maxpat")
