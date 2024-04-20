import maxpy as mp

# Create a new MaxPatch
patch = mp.MaxPatch()

# Define the number of operators for FM synthesis
numOperators = 2

# Place a cycle~ object for the carrier with a frequency of 440 Hz (A4 note)
carrierFreq = 440
carrier = patch.place(f"cycle~ {carrierFreq}", num_objs=1, starting_pos=[100, 100])[0]

# Place a cycle~ object for the modulator with a frequency of 220 Hz (A3 note) and modulation index of 100
modulatorFreq = 220
modulationIndex = 100
modulator = patch.place(f"cycle~ {modulatorFreq}", num_objs=1, starting_pos=[100, 200])[0]

# Create a multiplier (*~) to control the modulation index (modulation depth)
modIndexControl = patch.place("*~ " + str(modulationIndex), num_objs=1, starting_pos=[200, 200])[0]

# Create a multiply object (*~) to apply the frequency modulation to the carrier
fmApply = patch.place("*~", num_objs=1, starting_pos=[300, 150])[0]

# Connect the modulator to the modIndexControl
patch.connect([modulator.outs[0], modIndexControl.ins[0]])

# Connect the modIndexControl to one of the inputs of the fmApply object
patch.connect([modIndexControl.outs[0], fmApply.ins[1]])

# Connect the carrier frequency to the other input of the fmApply object
patch.connect([carrier.outs[0], fmApply.ins[0]])

# Place a dac~ object to output sound
dac = patch.place("dac~", num_objs=1, starting_pos=[500, 100])[0]

# Connect the FM synthesis output to the dac~
patch.connect([fmApply.outs[0], dac.ins[0]])

# Save the Max patch
patch.save("fm9.maxpat")