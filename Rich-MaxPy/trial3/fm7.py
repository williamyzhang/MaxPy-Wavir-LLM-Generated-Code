import maxpy as mp
import random

# Create a new Max patch
patch = mp.MaxPatch()

# Carrier oscillator which will be modulated
carrier_freq = 440  # Hz
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 100])[0]

# Modulation parameters
modulation_base_freq = 50  # Base modulation frequency in Hz
modulation_freq_variation = 20  # Hz variation for modulation frequency

# Let's create a loop for adding multiple modulators
num_modulators = 3
modulators = []
for i in range(num_modulators):
    # Vary modulation frequency slightly for each modulator
    mod_freq = modulation_base_freq + random.uniform(-modulation_freq_variation, modulation_freq_variation)
    # Place modulator oscillator
    modulator = patch.place(f"cycle~ {mod_freq}", num_objs=1, starting_pos=[100, 150 + 50*i])[0]
    modulators.append(modulator)

# Add a multiply object for modulation index control, which affects the depth of the FM effect
# This is hard-coded for the sake of simplicity in this example
modulation_index = patch.place("expr~ $v1*100", num_objs=1, starting_pos=[200, 300])[0]  # Modulation index multiplier

# Connect each modulator to the modulation index control
for modulator in modulators:
    patch.connect([modulator.outs[0], modulation_index.ins[0]])

# Connect the modulation index control to the frequency modulation input of the carrier
patch.connect([modulation_index.outs[0], carrier.ins[0]])

# Output for listening to the FM synthesis result
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 100])[0]

# Connect the carrier output to the DAC for audio output
patch.connect([carrier.outs[0], dac.ins[0]])
patch.connect([carrier.outs[0], dac.ins[1]])

# Save the Max patch
patch.save("fm7.maxpat")
