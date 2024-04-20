
import maxpy as mp
import random

# Create a new MaxPatch object
patch = mp.MaxPatch()

# Create a cycle~ object to generate a carrier sine wave
# Frequency set to a fixed value of 440 Hz
carrier_freq = 440
carrier = patch.place(f"cycle~ {carrier_freq}", num_objs=1, starting_pos=[100, 50])[0]

# Generate multiple modulator sine waves with random frequencies within a given range
num_modulators = 3
modulator_starting_pos = [200, 100]
for i in range(num_modulators):
    # Random frequency between 0.1Hz and 20Hz for AM effect
    mod_freq = random.uniform(0.1, 20)
    modulator = patch.place(f"cycle~ {mod_freq}", num_objs=1, starting_pos=[modulator_starting_pos[0], modulator_starting_pos[1] + (i * 50)])[0]
    
    # Adjust the amplitude of the modulator
    # Create a multiplier (*~) object to control the depth of modulation
    mod_depth = random.uniform(0.5, 1)
    multiplier = patch.place("*~", num_objs=1, starting_pos=[300, modulator_starting_pos[1] + (i * 50)])[0]
    
    # Connect modulator to multiplier
    patch.connect([(modulator.outs[0], multiplier.ins[0])])
    # Create a static gain value (a float) to act as the second input to the multiplier
    # This controls the depth of modulation
    gain = patch.place(f"float {mod_depth}", num_objs=1, starting_pos=[400, modulator_starting_pos[1] + (i * 50)])[0]
    patch.connect([(gain.outs[0], multiplier.ins[1])])
    
    # Create a mixer to combine the modulated signals and control the overall amplitude
    if i == 0:
        mixer = patch.place("*~", num_objs=1, starting_pos=[500, modulator_starting_pos[1]])[0]
        # Connect carrier to mixer
        patch.connect([(carrier.outs[0], mixer.ins[0])])
        patch.connect([(multiplier.outs[0], mixer.ins[1])])
    else:
        # For subsequent modulators, use an additional mixer to combine their effects
        new_mixer = patch.place("*~", num_objs=1, starting_pos=[500, modulator_starting_pos[1] + i * 50])[0]
        patch.connect([(mixer.outs[0], new_mixer.ins[0])])
        patch.connect([(multiplier.outs[0], new_mixer.ins[1])])
        mixer = new_mixer  # Update the main mixer to the new mixer for the next iteration

# Save the patch
patch.save("am5.maxpat")
