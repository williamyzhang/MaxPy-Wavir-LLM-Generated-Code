import maxpy
import random

# Initialize MaxPy
maxpy.setup()

# Create a sine wave oscillator
sine_wave = maxpy.create_object("cycle~", 300, 200)  # Positioned at (300, 200)

# Create an LFO (Low-Frequency Oscillator)
lfo = maxpy.create_object("cycle~", 300, 250)  # Positioned at (300, 250)

# Generate random rate for the LFO within a predefined range
lfo_freq = random.uniform(0.1, 5)  # Frequency range from 0.1 Hz to 5 Hz for vibrato effect
maxpy.create_message(lfo, lfo_freq, 0)  # Set the frequency of the LFO

# Create a multiplier for the LFO to control the vibrato depth
vibrato_depth = maxpy.create_object("*~", 300, 300)  # Positioned at (300, 300)
maxpy.create_message(vibrato_depth, 5, 0)  # Set the depth of vibrato

# Connecting the LFO to the multiplier
maxpy.connect(lfo, 0, vibrato_depth, 0)

# Create a +~ object to add the LFO effect to the sine wave's frequency
frequency_mod = maxpy.create_object("+~", 300, 350)  # Positioned at (300, 350)
maxpy.create_message(frequency_mod, 440, 0)  # Base frequency of the sine wave

# Connect the multiplier to the frequency_mod object
maxpy.connect(vibrato_depth, 0, frequency_mod, 0)

# Connect the frequency_mod to the sine wave oscillator's frequency inlet
maxpy.connect(frequency_mod, 0, sine_wave, 0)

# Output setup
dac = maxpy.create_object("dac~", 300, 400)  # Positioned at (300, 400)
maxpy.connect(sine_wave, 0, dac, 0)  # Connect the sine_wave to the left channel of dac~
maxpy.connect(sine_wave, 0, dac, 1)  # Connect the sine_wave to the right channel of dac~

# Save the patch
maxpy.save_patch("vibrato_effect_patch.maxpat")
