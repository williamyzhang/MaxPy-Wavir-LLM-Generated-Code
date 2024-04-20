import maxpy as mp 

# Create a new MaxPatch to work with
patch = mp.MaxPatch()

# The number of wave generators to simulate varying wave sounds
numWaves = 3

# Placing objects needed to create the sounds of waves
noiseGen = patch.place("noise~", num_objs=numWaves, starting_pos=[100, 50])
resonFilter = patch.place("reson~ 200 1 0.5", num_objs=numWaves, starting_pos=[100, 100])
dac = patch.place("dac~", num_objs=1, starting_pos=[300, 150])[0]

# To control variations in the amplitude and filter parameters
ampCtl = patch.place("*~ 0.3", num_objs=numWaves, starting_pos=[100, 150])
freqRandom = patch.place("random 600", num_objs=numWaves, starting_pos=[100, 200])
freqCtl = patch.place("+ 200", num_objs=numWaves, starting_pos=[100, 250])
qRandom = patch.place("random 20", num_objs=numWaves, starting_pos=[100, 300])
qCtl = patch.place("/ 30", num_objs=numWaves, starting_pos=[100, 350])

# Connection of the objects to create the wave sound chain
for i in range(numWaves):
    patch.connect([noiseGen[i].outs[0], resonFilter[i].ins[0]])
    patch.connect([resonFilter[i].outs[0], ampCtl[i].ins[0]])
    patch.connect([ampCtl[i].outs[0], dac.ins[i]])

    # Connections for control signals
    patch.connect([freqRandom[i].outs[0], freqCtl[i].ins[0]])
    patch.connect([freqCtl[i].outs[0], resonFilter[i].ins[1]])
    patch.connect([qRandom[i].outs[0], qCtl[i].ins[0]])
    patch.connect([qCtl[i].outs[0], resonFilter[i].ins[2]])

# Save the Max patch with a name
patch.save("OW6.maxpat")