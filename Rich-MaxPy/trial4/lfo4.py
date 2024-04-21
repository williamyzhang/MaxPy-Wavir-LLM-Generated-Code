import maxpy
import random

# Initialize MaxPy patch
patch = maxpy.MaxPy()

# Create a cycle~ object for the sine wave at a base frequency
base_freq = 440  # Base frequency of the sine wave in Hz
sine_wave = patch.new_object('cycle~', args=[base_freq], x=100, y=100)

# Create a cycle~ object for the LFO with random frequency within a selected range (e.g., 0.1 to 5 Hz)
lfo_freq = random.uniform(0.1, 5)  # LFO frequency in Hz
lfo = patch.new_object('cycle~', args=[lfo_freq], x=100, y=200)

# Create a *~ object to multiply the sine wave frequency by 1 +/- LFO amplitude
vibrato_depth = random.uniform(0.1, 20)  # Vibrato depth as a multiplier of the base frequency
lfo_depth = patch.new_object('*~', args=[vibrato_depth], x=100, y=300)

# Connect the LFO output to the *~ object's right inlet to modulate the depth
patch.connect(lfo, 0, lfo_depth, 1)

# Create a +~ object to add the modulated LFO output to the base frequency
freq_modulation = patch.new_object('+~', args=[base_freq], x=100, y=400)

# Connect the sine wave generator to a dac~ object for output
output = patch.new_object('dac~', x=100, y=500)

# Connect objects
patch.connect(sine_wave, 0, output, 0)              # Connect sine wave to left channel of output
patch.connect(lfo_depth, 0, freq_modulation, 0)     # Connect LFO depth modulation to frequency modulation
patch.connect(freq_modulation, 0, sine_wave, 0)     # Modulate sine wave frequency for vibrato effect

# Print the generated Max patch code to the console or file as needed
patch.print()
