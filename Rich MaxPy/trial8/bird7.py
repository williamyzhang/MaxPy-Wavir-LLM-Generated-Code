import maxpy as mp
import random

patch = mp.MaxPatch()

# Base Position for the First Object in the Patch
starting_pos = [50, 50]

# Generating Random Pitches and Durations
num_calls = 5  # Number of different pitches/durations to generate
for i in range(num_calls):
    pitch = random.randint(40, 80)  # Random MIDI pitch between 40 and 80
    duration = random.randint(100, 500)  # Random duration between 100 and 500 ms
    velocity = random.randint(50, 127)  # Random MIDI velocity

    # Placing objects
    toggle = patch.place("toggle", starting_pos=[starting_pos[0], starting_pos[1] + (i * 100)])[0]
    metro = patch.place(f"metro {random.randint(200, 1000)}", starting_pos=[starting_pos[0] + 100, starting_pos[1] + (i * 100)])[0]
    makenote = patch.place(f"makenote {velocity} {duration}", starting_pos=[starting_pos[0] + 200, starting_pos[1] + (i * 100)])[0]
    noteout = patch.place("noteout", starting_pos=[starting_pos[0] + 300, starting_pos[1] + (i * 100)])[0]

    # Random Pitch Generation
    random_pitch = patch.place(f"random {pitch}", starting_pos=[starting_pos[0] + 400, starting_pos[1] + (i * 100)])[0]
    add = patch.place("expr $i1 + 40", starting_pos=[starting_pos[0] + 500, starting_pos[1] + (i * 100)])[0]  # Ensuring the pitch is within a musical range

    # Connecting Objects
    patch.connect([toggle.outs[0], metro.ins[0]])
    patch.connect([metro.outs[0], makenote.ins[0]])
    patch.connect([makenote.outs[0], noteout.ins[0]])
    patch.connect([makenote.outs[1], noteout.ins[1]])
    patch.connect([metro.outs[0], random_pitch.ins[0]])
    patch.connect([random_pitch.outs[0], add.ins[0]])
    patch.connect([add.outs[0], makenote.ins[2]])

patch.save("bird7.maxpat")
