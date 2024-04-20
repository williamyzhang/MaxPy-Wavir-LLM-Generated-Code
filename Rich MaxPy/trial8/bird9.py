import maxpy as mp
import random

patch = mp.MaxPatch()

# Number of notes/chirps in the bird call
num_chirps = 5

# Starting positions for visual organization
starting_x = 50
starting_y = 50
x_increment = 150
y_increment = 100

# Phasor~ to drive the overall timing
phasor = patch.place("phasor~ 0.2", num_objs=1, starting_pos=[starting_x, starting_y])[0]

# Generating multiple chirps
for i in range(num_chirps):
    # Random frequency for variation
    freq = random.randint(800, 1200)  # Frequency range suitable for birdcalls
    cycle = patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[starting_x + x_increment * i, starting_y + y_increment])[0]
    
    # Envelope to simulate a natural chirp sound
    line = patch.place("line~", num_objs=1, starting_pos=[starting_x + x_increment * i, starting_y + 2 * y_increment])[0]
    trigger_bang = patch.place("t b b", num_objs=1, starting_pos=[starting_x + x_increment * i, starting_y + 3 * y_increment])[0]
    message = patch.place(f"0.5, 0 {random.randint(50, 150)}", num_objs=1, starting_pos=[starting_x + x_increment * i, starting_y + 4 * y_increment])[0]  # Dynamics of each chirp

    # Connect patch cords
    patch.connect([phasor.outs[0], cycle.ins[0]])
    patch.connect([trigger_bang.outs[0], message.ins[0]])
    patch.connect([trigger_bang.outs[1], line.ins[0]])
    patch.connect([message.outs[0], line.ins[0]])
    patch.connect([line.outs[0], cycle.ins[0]])
    
    # Adding some randomness to the attack and decay of the chirps
    random_attack = random.randint(10, 100)
    random_decay = random.randint(100, 200)
    envelope = patch.place(f"line~ {random_attack}, {random_decay}", num_objs=1, starting_pos=[starting_x + x_increment * i, starting_y + 5 * y_increment])[0]
    patch.connect([trigger_bang.outs[1], envelope.ins[0]])
    patch.connect([envelope.outs[0], cycle.ins[0]])

# Save the patch
patch.save("bird9.maxpat")
