import maxpy as mp
import random

# Create a new MaxPatch
patch = mp.MaxPatch()

# Create carrier oscillator
carrier_freq = 300  # Frequency of the carrier wave
carrier = patch.place("cycle~", attrs=[carrier_freq])[0]

# Define parameters for modulator
num_modulators = 5  # Number of modulator oscillators
modulator_freq_range = (50, 300)  # Frequency range for modulators
modulation_index_range = (100, 300)  # Range for modulation index values

# Create modulators and modulate carrier frequency
for i in range(num_modulators):
    # Generate random frequency and modulation index for each modulator
    freq = random.randint(*modulator_freq_range)
    modulation_index = random.randint(*modulation_index_range)
    
    # Create modulator oscillator
    modulator = patch.place("cycle~", attrs=[freq])[0]
    
    # Create *~ object to control modulation amplitude (modulation index)
    mod_index_control = patch.place("*~", attrs=[modulation_index])[0]
    
    # Connect modulator to modulation index control
    patch.connect([modulator.outs[0], mod_index_control.ins[0]])
    
    # Create +~ object to add modulated frequency to the carrier frequency
    freq_adder = patch.place("+~", attrs=[carrier_freq])[0]
    
    # Connect mod_index_control to freq_adder
    patch.connect([mod_index_control.outs[0], freq_adder.ins[0]])
    
    # Connect freq_adder back to the carrier to modulate its frequency
    patch.connect([freq_adder.outs[0], carrier.ins[0]])

# Connect the final output to a dac~ for audio output
dac = patch.place("dac~")[0]
patch.connect([carrier.outs[0], dac.ins[0]])

# Save the patch
patch.save("fm6.maxpat")
