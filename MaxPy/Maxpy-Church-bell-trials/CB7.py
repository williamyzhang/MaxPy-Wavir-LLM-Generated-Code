import maxpy as mp

# Initialize the patch
patch = mp.MaxPatch()

# Place `cycle~` objects to generate the sine wave tones. Church bells have rich harmonic 
# content, but a fundamental tone around 500Hz can be a good starting point.
# We'll add harmonics at intervals that are typical for a bell, e.g., a minor third and fifth.
fundamental_freq = 500  # 500Hz for the fundamental frequency
harmonic_intervals = [1, 5/4, 3/2]  # Fundamental, minor third, and fifth

tones = []
for i, interval in enumerate(harmonic_intervals):
    freq = fundamental_freq * interval
    tones.append(patch.place(f"cycle~ {freq}", num_objs=1, starting_pos=[100 * i, 100])[0])

# To simulate the strike of a bell, we'll use the `line~` object to create an amplitude envelope.
# Start loud and decay over time, e.g., 1 to 0 over 10 seconds.
env = patch.place("line~", num_objs=1, starting_pos=[0, 200])[0]

# A `bang` to trigger the envelope
bang = patch.place("bang", num_objs=1, starting_pos=[-100, 150])[0]

# Connect the bang to the envelope to trigger it
patch.connect([bang.outs[0], env.ins[0]])

# Set the initial and final amplitude levels and the decay time in milliseconds (10000ms = 10s)
patch.place("10000, 1. 0.1, 0.", num_objs=1, starting_pos=[-200, 200])

# Place a `*~` object for each tone to multiply the generated tone by the envelope
for tone in tones:
    multiply = patch.place("*~", num_objs=1, starting_pos=[tone.position[0], tone.position[1] + 100])[0]
    patch.connect([tone.outs[0], multiply.ins[0]])
    patch.connect([env.outs[0], multiply.ins[1]])

# Mix the signals together and connect them to the output
mix = patch.place("*~ 0.33", num_objs=len(tones), starting_pos=[0, 400])
for i, multiply in enumerate(mix):
    patch.connect([multiply.outs[0], mix[i].ins[0]])

output = patch.place("dac~", num_objs=1, starting_pos=[200, 500])[0]
for mixed_signal in mix:
    patch.connect([mixed_signal.outs[0], output.ins[0]])

# Save the patch
patch.save("CB7.maxpat")