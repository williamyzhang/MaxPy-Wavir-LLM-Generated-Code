
import maxpy
import random

# Set the fundamental frequency.
fundamental_freq = 440  # A4

# Initialize a new MaxMSP patch
my_patch = maxpy.MaxPatch("AdditiveSynthPatch")

# Create the fundamental sine wave oscillator
fundamental_osc = maxpy.MaxObject("cycle~", args=[fundamental_freq])
my_patch.add(fundamental_osc)

# Generate four partials above the fundamental frequency
num_partials = 4
for partial in range(1, num_partials + 1):
    # Use random variation for each partial's amplitude
    amplitude = 0.5 + random.random() * 0.5
    # Create the partial sine wave oscillator
    partial_freq = fundamental_freq * (partial + 1)  # Calculate frequency for the partial
    partial_osc = maxpy.MaxObject("cycle~", args=[partial_freq])
    # Adjust amplitude of the partial
    amp_adjust = maxpy.MaxObject("gain~", args=[amplitude])
    
    # Connect the partial oscillator to its amplitude adjuster
    my_patch.add(partial_osc)
    my_patch.add(amp_adjust)
    my_patch.connect(partial_osc, 0, amp_adjust, 0)
    
    # Connect the amplitude adjuster of the partial to the output, mixing with the fundamental
    my_patch.connect(amp_adjust, 0, fundamental_osc, 0)

# Optionally, add a dac~ object to hear the result
dac = maxpy.MaxObject("dac~")
my_patch.add(dac)
# Connect the fundamental oscillator to the dac (output)
my_patch.connect(fundamental_osc, 0, dac, 0)

# Save the patch
my_patch.save("add2.maxpat")

print("Additive synthesis patch created with a fundamental frequency of {} Hz and {} partials.".format(fundamental_freq, num_partials))
