import maxpy as mp
from random import randint

patch = mp.MaxPatch()

# Number of bells
numBells = 1

# Uses a metro object to trigger the bell sound at regular intervals, with slight random variations
metro_interval = 2000  # base interval in ms
metro_variation = 500  # max variation in ms
mtr = patch.place(f"metro {metro_interval}", num_objs=numBells, starting_pos=[50, 50])

# Generates slightly randomized intervals for each metro object to simulate irregularities
for m in mtr:
    interval = randint(metro_interval - metro_variation, metro_interval + metro_variation)
    patch.place(f"int {interval}", num_objs=1, starting_pos=[m.x, m.y - 50], connect_to=[m.ins[0]])

# Generates a random pitch within a specific range to simulate different bell sizes
pitch_base = 60  # MIDI note number for a base pitch
pitch_variation = 5  # range of variation for the pitch
frequency_base = 220  # frequency in Hz corresponding to the base MIDI note
frequency_variation = 50  # range of variation for the frequency in Hz

# Creating cycling tone with variation in pitch for bell sound
for i in range(numBells):
    # Randomizes the pitch and frequency for each bell
    pitch = randint(pitch_base - pitch_variation, pitch_base + pitch_variation)
    frequency = frequency_base + randint(-frequency_variation, frequency_variation)
    cycle = patch.place(f"cycle~ {frequency}", num_objs=1, starting_pos=[200, 50 + (i * 100)])

    # Modulating amplitude with a phasor to mimic bell's decay
    phasor = patch.place(f"phasor~ {1/float(interval/1000)}", num_objs=1, starting_pos=[100, 100 + (i * 100)])
    mult = patch.place(f"*~ 0.5", num_objs=1, starting_pos=[400, 150 + (i * 100)])  # Reduces amplitude

    # Connecting objects
    patch.connect([mtr[i].outs[0], cycle.ins[0]])
    patch.connect([phasor.outs[0], mult.ins[0]])
    patch.connect([cycle.outs[0], mult.ins[1]])

# Audio output
dac = patch.place("ezdac~", num_objs=1, starting_pos=[600, 200])

# Connecting the final modulated cycle~ object to the audio output
for i in range(numBells):
    patch.connect([mult.outs[0], dac.ins[0]])
    patch.connect([mult.outs[0], dac.ins[1]])

# Saving the patch
patch.save("bell9.maxpat")
