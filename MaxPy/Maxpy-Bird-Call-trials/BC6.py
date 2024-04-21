import maxpy as mp 

# Start a new MaxPatch
patch = mp.MaxPatch()

# Bird call parameters
numCalls = 5  # Number of different calls a bird can make
startingPitch = 60  # Starting MIDI pitch, can be adjusted
pitchVariation = 24  # How much the pitch can vary up or down
tempo = 250  # Tempo of the metro object, can be adjusted for speed of call
noteDuration = [25, 250]  # Shortest and longest note duration (in ms)

# Create a metro object to control the pace of the bird calls
mtr = patch.place("metro " + str(tempo), num_objs=1, starting_pos=[0, 50])[0]
tg = patch.place("toggle", num_objs=1, starting_pos=[0, 10])[0]

# Connect the metro to a toggle to start/stop the bird call rhythm
patch.connect([tg.outs[0], mtr.ins[0]])

# Random object to generate random timing for notes
rndTime = patch.place("random 1000", num_objs=1, starting_pos=[100, 200])[0]
scaleTime = patch.place("*~ 0.002", num_objs=1, starting_pos=[100, 250])[0]  # Scale to acceptable ms range

# Random object for pitch variation
rndPitch = patch.place("random " + str(pitchVariation), num_objs=1, starting_pos=[200, 200])[0]
addPitch = patch.place("+ " + str(startingPitch), num_objs=1, starting_pos=[200, 250])[0]  

# Makenote to generate the MIDI messages
mn = patch.place("makenote", num_objs=1, starting_pos=[300, 200])[0]

# Noteout to send the MIDI messages to a synthesizer or external MIDI device
no = patch.place("noteout", num_objs=1, starting_pos=[400, 250])[0]

# Connecting the objects
patch.connect([mtr.outs[0], rndTime.ins[0]])
patch.connect([rndTime.outs[0], scaleTime.ins[0]])
patch.connect([scaleTime.outs[0], mn.ins[1]])

patch.connect([mtr.outs[0], rndPitch.ins[0]])
patch.connect([rndPitch.outs[0], addPitch.ins[0]])
patch.connect([addPitch.outs[0], mn.ins[0]])

patch.connect([mn.outs[0], no.ins[0]])
patch.connect([mn.outs[1], no.ins[1]])

# Save the patch
patch.save("BC6.maxpat")