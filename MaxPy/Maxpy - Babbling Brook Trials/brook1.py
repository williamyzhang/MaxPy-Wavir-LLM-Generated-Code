import maxpy as mp

patch = mp.MaxPatch()

# Define the number of noise~ objects to simulate various stream components
numStreams = 5

# Create multiple instances of noise~ and spatialization objects 
noise = patch.place("noise~", num_objs=numStreams, starting_pos=[0, 0])
bpfilter = patch.place("biquad~", num_objs=numStreams, starting_pos=[100, 0])
pan = patch.place("panner~", num_objs=numStreams, starting_pos=[200, 0])
dac = patch.place("ezdac~", num_objs=1, starting_pos=[300, 100])[0]

# Control frequencies for filters to shape the noise into a more water-like sound
frequencies = [250, 500, 750, 1000, 1250]

# Connect each noise~ to a biquad~ (bandpass filter), then to panner~, and then to the dac
for i in range(numStreams):
    patch.connect([noise[i].outs[0], bpfilter[i].ins[0]])
    patch.connect([bpfilter[i].outs[0], pan[i].ins[0]])
    patch.connect([pan[i].outs[0], dac.ins[0]])
    patch.connect([pan[i].outs[1], dac.ins[1]])

    # Modify the frequency of each filter to tweak the water sound
    bpfilter_fq = "freq " + str(frequencies[i])
    bpfilter_q = "q 1"
    patch.place(bpfilter_fq, num_objs=1, starting_pos=[120, i*50 + 20])[0]
    patch.place(bpfilter_q, num_objs=1, starting_pos=[140, i*50 + 40])[0]

# Generate random panning and filter frequency modulations
for i in range(numStreams):
    line = patch.place("line~", num_objs=1, starting_pos=[320, i*100 + 50])[0]
    rand = patch.place("random 500", num_objs=1, starting_pos=[340, i*100 + 70])[0]
    metro = patch.place("metro 2000", num_objs=1, starting_pos=[360, i*100 + 90])[0]

    patch.connect([metro.outs[0], rand.ins[0]])
    patch.connect([rand.outs[0], line.ins[0]])
    patch.connect([line.outs[0], pan[i].ins[1]])
    
    # Vary the metro rate to create a more dynamic and less predictable water sound
    metro_rate = "time " + str(1000 + i*500)
    patch.place(metro_rate, num_objs=1, starting_pos=[380, i*100 + 110])[0]

patch.save("babbling-brook.maxpat")