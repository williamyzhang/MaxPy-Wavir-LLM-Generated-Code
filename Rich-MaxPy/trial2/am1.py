import maxpy as mp
import random

# Create a new patch
patch = mp.MaxPatch()

# Initialize parameters
numCarriers = 3  # Number of carrier waves
numModulators = 3  # Number of modulators
startPosCarrier = [100, 50]  # Starting position for carriers
startPosModulator = [100, 150]  # Starting position for modulators
carrierFreqBase = 440  # Base frequency for the first carrier
modulatorFreqBase = 20  # Base frequency for the first modulator
freqIncrement = 50  # Frequency increment for subsequent carriers/modulators
ampBase = 0.1  # Base amplitude for modulation
ampIncrement = 0.05  # Amplitude increment for each modulator

# Create carriers and modulators
carriers = []
modulators = []
for i in range(numCarriers):
    # Calculate frequency for current carrier
    freq = carrierFreqBase + i * freqIncrement
    # Place carrier wave (sine wave oscillator)
    carrier = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[startPosCarrier[0], startPosCarrier[1] + i * 100])[0]
    carriers.append(carrier)

for j in range(numModulators):
    # Calculate frequency for current modulator
    freq = modulatorFreqBase + j * freqIncrement
    # Place modulator wave (sine wave oscillator)
    modulator = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[startPosModulator[0], startPosModulator[1] + j * 100])[0]
    modulators.append(modulator)
    
    # Create random amplitude for modulation
    amp = ampBase + random.random() * ampIncrement
    # Amplitude modulation applied to modulator
    modulator_amp = patch.place(f"*~ {amp}", num_objs=1, starting_pos=[startPosModulator[0] + 100, startPosModulator[1] + j * 105])[0]
    
    # Connect the modulator to its amplitude control
    patch.connect([modulator.outs[0], modulator_amp.ins[0]])

# Connecting each carrier with each modulated signal for AM synthesis
for carrier in carriers:
    for mod_amp in modulators:
        multiply = patch.place("*~", num_objs=1, starting_pos=[startPosCarrier[0] + 200, startPosCarrier[1]])[0]
        patch.connect([carrier.outs[0], multiply.ins[0]])
        patch.connect([mod_amp.outs[0], multiply.ins[1]])
        
        # Update the start position for the next connection
        startPosCarrier[1] += 50

# Save the patch
patch.save("am1.maxpat")
