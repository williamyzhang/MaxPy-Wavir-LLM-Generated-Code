import maxpy as mp
import random

# Initialize Max Patch
patch = mp.MaxPatch()

# Parameters for bell sound simulation
numBells = 5
baseMidiNote = 36  # Corresponding to C2, a typical starting point for deep bells
midiVariance = 12  # Range of MIDI notes to randomly select from for variance in bell tones

# Objects
bells = []
for i in range(numBells):
    x_pos = i * 100
    bellPitch = baseMidiNote + random.randint(0, midiVariance)
    
    # Create a toggle to activate the bell sound
    toggle = patch.place("toggle", num_objs=1, starting_pos=[x_pos, 100])[0]
    
    # Create a metro object for the rhythm of the bell. The interval is randomized to simulate the irregular ringing
    metroInterval = random.randint(500, 2000)  # Ranges from half a second to two seconds
    metro = patch.place(f"metro {metroInterval}", num_objs=1, starting_pos=[x_pos, 150])[0]
    
    # Connect the toggle to the metro to start/stop the bell
    patch.connect([toggle.outs[0], metro.ins[0]])
    
    # Create a makenote object to prepare MIDI messages with a specified duration
    duration = random.randint(1000, 3000)  # Duration ranges from 1 to 3 seconds
    makenote = patch.place(f"makenote {bellPitch} {duration}", num_objs=1, starting_pos=[x_pos, 200])[0]
    
    # Connect the metro to makenote to trigger note generation on each metro bang
    patch.connect([metro.outs[0], makenote.ins[0]])
    
    # Output the MIDI notes to a noteout object
    noteout = patch.place("noteout", num_objs=1, starting_pos=[x_pos, 250])[0]
    patch.connect([makenote.outs[0], noteout.ins[0]])
    patch.connect([makenote.outs[1], noteout.ins[1]])
    
    # Add the bell setup to the bells list for potential further manipulation
    bells.append((toggle, metro, makenote, noteout))

# Save the patch
patch_name = "bell1.maxpat"
patch.save(patch_name)
print(f"Patch saved as {patch_name}")
