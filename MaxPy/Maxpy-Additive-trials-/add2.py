import maxpy

# Initialize the MaxPy patch
patch = maxpy.MaxPatch()

# Base frequency for our sine wave (f)
base_freq = 220  # In Hertz (Hz)

# Create original sine wave oscillator
base_osc = patch.create(maxpy.maxobjects.Oscillator, arguments=[base_freq])

# Set the waveform to sine for the base oscillator
patch.create(maxpy.maxobjects.Message, arguments=["waveform sine"], outlets_to=base_osc)

# Create four additional sine wave oscillators for the partials
for i in range(1, 5):
    # Calculate frequency for the partial (harmonic series)
    partial_freq = base_freq * (i+1)  # (i+1) to start from 2f, 3f, 4f, 5f
    
    # Create oscillator for the partial
    partial_osc = patch.create(maxpy.maxobjects.Oscillator, arguments=[partial_freq])
    
    # Set the waveform to sine for this partial oscillator
    patch.create(maxpy.maxobjects.Message, arguments=["waveform sine"], outlets_to=partial_osc)
    
    # Connect each partial's output to the same dac~ input as the base oscillator for addition
    patch.connect(partial_osc, 0, base_osc.get_connection_point())

# Create a "dac~" object for sound output and connect
dac = patch.create(maxpy.maxobjects.Dac)
patch.connect(base_osc, 0, dac)

# Save the patch
patch.save("add2.maxpat")

# Output path for quick access
print("Patch saved as additive_synthesis_with_partials.maxpat")