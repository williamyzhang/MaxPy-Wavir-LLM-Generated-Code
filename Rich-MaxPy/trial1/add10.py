
import maxpy

# Start a new patch
patch = maxpy.MaxPatch("additive_synth_patch.json")

# Base frequency for the sine wave
base_frequency = 220  # Hz

# Create an oscillator for the fundamental
fund_osc = patch.create("cycle~", arguments=[base_frequency])
fund_output = patch.create("gain~", arguments=[0.5])  # Initial amplitude for the fundamental

# Create the DAC~
dac = patch.create("dac~")

# Connect the fundamental oscillator to the DAC~
patch.connect(fund_osc, 0, fund_output, 0)
patch.connect(fund_output, 0, dac, 0)
patch.connect(fund_output, 0, dac, 1)

# Generate 4 partials with increasing frequency
number_of_partials = 4

for i in range(1, number_of_partials + 1):
    partial_freq = base_frequency * (i + 1)  # Calculate the frequency of the partial
    
    # Create an oscillator for each partial
    partial_osc = patch.create("cycle~", arguments=[partial_freq])
    
    # Lower the amplitude of each partial for demonstration
    partial_amp = 0.5 - (i * 0.1)  # Decreasing amplitude for each partial
    partial_output = patch.create("gain~", arguments=[partial_amp])
    
    # Connect the partial oscillator to its gain and then to the DAC~
    patch.connect(partial_osc, 0, partial_output, 0)
    patch.connect(partial_output, 0, dac, 0)
    patch.connect(partial_output, 0, dac, 1)

# Save the patch
patch.save()
