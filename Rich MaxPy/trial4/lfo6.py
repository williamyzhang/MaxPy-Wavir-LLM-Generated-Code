import random
from maxpy.maxpy import MaxPatch

# Initialize a new MaxPatch
patch = MaxPatch()

# Create the main sine wave oscillator
main_oscillator = patch.new_object('cycle~', 100, 200, arguments=[440])
# Create the LFO with a frequency between 0.5 and 5 Hz for a noticeable vibrato effect
lfo_frequency = random.uniform(0.5, 5)
lfo = patch.new_object('cycle~', 300, 200, arguments=[lfo_frequency])

# Modulate the depth of the vibrato effect between 1 and 10 Hz
vibrato_depth = random.uniform(1, 10)
scale = patch.new_object('scale', 400, 300, arguments=[0, 1, -vibrato_depth, vibrato_depth])

# Connect the LFO to the scale object
patch.connect(lfo, 0, scale, 0)
# Add a `+~` object to combine the effect of the LFO with the base frequency of the oscillator
frequency_mixer = patch.new_object('+~', 200, 300, arguments=[440])
# Connect the scaled LFO output to the frequency mixer
patch.connect(scale, 0, frequency_mixer, 1)

# Connect the frequency mixer to the main oscillator's frequency modulation inlet
patch.connect(frequency_mixer, 0, main_oscillator, 0)
# Output the main oscillator's signal
dac = patch.new_object('dac~', 100, 400)
patch.connect(main_oscillator, 0, dac, 0)
patch.connect(main_oscillator, 0, dac, 1)

# Optional: Save the patch
patch.save("vibrato_sine_wave.maxpat")

# Print out the generated code (for visual confirmation/inspection)
print(patch.generate())
