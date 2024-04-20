import maxpy as mp
import random

# Create a new MaxPatch object
patch = mp.MaxPatch()

# Setting the number of oscillators for FM synthesis
numOscillators = 5

# The starting positions for carrier and modulator oscillators
carrierStartingPos = [50, 50]
modulatorStartingPos = [50, 150]

# Create carrier and modulator oscillators with random frequencies
carriers = patch.place("cycle~", num_objs=numOscillators, starting_pos=carrierStartingPos)
modulators = patch.place("cycle~", num_objs=numOscillators, starting_pos=modulatorStartingPos)

# Iterating through each oscillator to set frequencies and connect modulators to carriers
for i in range(numOscillators):
    
    # Random frequency for both carrier and modulator
    carrierFreq = random.randint(100, 1000)
    modulatorFreq = random.randint(1, 100)
    modulatorIndex = random.random() * 10
    
    # Update the oscillator frequencies with random values
    carriers[i] = patch.place(f"cycle~ {carrierFreq}", num_objs=1, starting_pos=[carrierStartingPos[0] + i*100, carrierStartingPos[1]])[0]
    modulators[i] = patch.place(f"cycle~ {modulatorFreq}", num_objs=1, starting_pos=[modulatorStartingPos[0] + i*100, modulatorStartingPos[1]])[0]
    
    # Creating a multiplication object to adjust modulation index
    multiply = patch.place("*~", num_objs=1, starting_pos=[modulatorStartingPos[0] + i*100, modulatorStartingPos[1] + 100])[0]
    
    # Connecting modulator to the multiplier and setting modulation index
    patch.connect([modulators[i].outs[0], multiply.ins[0]])
    patch.connect([patch.place(f"sig~ {modulatorIndex}", num_objs=1, starting_pos=[modulatorStartingPos[0] + i*100, modulatorStartingPos[1] + 50])[0].outs[0], multiply.ins[1]])
    
    # Connecting the multiplier output to the carrier frequency modulation
    patch.connect([multiply.outs[0], carriers[i].ins[0]])

# Output setup
dac = patch.place("dac~", num_objs=1, starting_pos=[50, 350])[0]

# Connect all carriers to the output
for carrier in carriers:
    patch.connect([carrier.outs[0], dac.ins[0]])
    patch.connect([carrier.outs[0], dac.ins[1]])

# Save the patch
patch.save("fm10.maxpat")
